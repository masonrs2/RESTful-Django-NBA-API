import json
from typing import Optional, List
from ninja import NinjaAPI
from nba_api.stats.endpoints import leaguegamefinder
from nba_api.live.nba.endpoints import scoreboard
from nba_api.live.nba.endpoints import boxscore
from .constants.constants import all_stats_columns, GetTeamsDict
from .Enums.stats import Stats
from ninja.errors import HttpError
from datetime import timezone
from dateutil import parser
from .Schema import PlayerSchema, NotFoundSchema
from .Models import Player
from django.http import JsonResponse
from .Models import Player
from .Services import GetPlayerStats, GetPlayerStatsDf

api = NinjaAPI()

## Should add the season parameter in all routes here instead of hard coding
@api.get("/leadingScorers")
def leadingScorers(request):
    return GetPlayerStats("2023-24", Stats.POINTS_PER_GAME.value)

@api.get("/leadingAssists")
def leadingAssists(request):
    return GetPlayerStats("2023-24", Stats.ASSISTS.value)

@api.get("/leadingRebounds")
def leadingRebounds(request):
    return GetPlayerStats("2023-24", Stats.REBOUNDS.value)

@api.get("/leadingBlocks")
def leadingBlocks(request):
    return GetPlayerStats("2023-24", Stats.BLOCKS.value)

@api.get("/leadingSteals")
def leadingSteals(request):
    return GetPlayerStats("2023-24", Stats.STEALS.value)

@api.get("/{team}/{stat}")
def leadingStatsByTeam(request, team: str, stat: str):
    try:
        team = team.lower()
        if stat.upper() not in all_stats_columns:
            raise HttpError(400, "Invalid stat parameter provided.")
        
        team_dict = GetTeamsDict()
        matching_team = None
        matching_key = None
        if team in team_dict:
            matching_team = team_dict[team]
            matching_key = team
        else:
            for key, value in team_dict.items():
                if team in [value['full_name'], value['nickname']]:
                    matching_team = value
                    matching_key = key
                    break
        
        if not matching_key:
            raise HttpError(400, "Invalid team parameter provided.")
        ## Should add the season parameter here instead of hard coding
        df = GetPlayerStatsDf("2023-24")
        df_team = df[df['TEAM_ABBREVIATION'] == matching_key.upper()]
        df_team = df_team.sort_values(by=[stat], ascending=False)
        print(df_team)
        return df_team.to_json(orient='records')
            
    except Exception as e:
        print("An error occurred:", e)
        raise HttpError(500,"Invalid Query Parameter Passed.")

@api.get("/schedule")
def GetGameResultsByTeam(request, team: str, season: Optional[str] = None):
    try:
        team = team.lower()
        team_dict = GetTeamsDict()
        matching_team = None
        matching_key = None
        if team in team_dict:
            matching_team = team_dict[team]
            matching_key = team
        else:
            for key, value in team_dict.items():
                if team in [value['full_name'], value['nickname']]:
                    matching_team = value
                    matching_key = key
                    break
        
        if not matching_key:
            raise HttpError(400, "Invalid team parameter provided.")
       
        print("matching key: ", matching_key)
        gamefinder = leaguegamefinder.LeagueGameFinder(team_id_nullable=matching_team['id'])
        games = gamefinder.get_data_frames()[0]
        games = games[games.SEASON_ID.str[-4:] == "2023"]
        return games.to_json(orient='records')
        
    except Exception as e:
        print("An error occurred:", e)
        raise HttpError(500,"Invalid Query Parameter Passed.")

@api.get("/todaysGames")
def GetTodaysGames(request): 
    try:
        f = "{gameId}: {awayTeam} vs. {homeTeam} @ {gameTimeLTZ}" 

        board = scoreboard.ScoreBoard()
        if not board: 
            return json.dumps([])

        if not board.score_board_date:
            print("Invalid score board date.")
            raise HttpError(400, "Invalid score board date.")
        print("ScoreBoardDate: " + board.score_board_date)

        games = board.games.get_dict()
        if not games: 
            return json.dumps([])

        todaysGames = []
        for game in games:
            if not all(key in game for key in ("gameId", "awayTeam", "homeTeam", "gameTimeUTC")):
                print("Invalid game data.")
                raise HttpError(400, "Invalid game data.")
            try:
                gameTimeLTZ = parser.parse(game["gameTimeUTC"]).replace(tzinfo=timezone.utc).astimezone(tz=None)
            except ValueError:
                print("Invalid game time.")
                raise HttpError(400, "Invalid game time.")
            game_info = f.format(gameId=game['gameId'], awayTeam=game['awayTeam']['teamName'], homeTeam=game['homeTeam']['teamName'], gameTimeLTZ=gameTimeLTZ)
            todaysGames.append(game_info)

    except Exception as e:
        print("An error occurred:", e)
        raise HttpError(500,"Invalid Query Parameter Passed.")
    
    return json.dumps(todaysGames)

@api.get("/game")
def GetGameBoxScore(request, gameId: int):
    try:
        gameId = str(gameId)
        gameId = str(gameId).zfill(10)  # Pad the gameId with leading zeros if necessary
        if not gameId.isdigit():
            print("Invalid gameId provided. gameId should be numeric.", gameId)
            raise HttpError(400, "Invalid gameId provided. gameId should be numeric.")
        if len(gameId) < 10:
            print("Invalid gameId provided. gameId should be at least 10 characters long.", gameId)
            raise HttpError(400, "Invalid gameId provided. gameId should be at least 10 characters long.", gameId)
        if int(gameId) <= 0:
            print("Invalid gameId provided. gameId should be positive.")
            raise HttpError(400, "Invalid gameId provided. gameId should be positive.")

        box = boxscore.BoxScore(gameId)
        box = box.game.get_dict()
        if not box:
            print("No box score data found for the provided gameId.")
            raise HttpError(404, "No box score data found for the provided gameId.")

    except Exception as e:
        print("An error occurred:", e)
        raise HttpError(500,"Invalid Query Parameter Passed.")
    return json.dumps(box)

@api.post("/watchlist", response={201: PlayerSchema})
def AddPlayerToWishlist(request, player: PlayerSchema):
    try:
        # Create a new Player instance and save it to the database
        Player.objects.create(
            first_name=player.first_name,
            last_name=player.last_name,
            team=player.team,
            player_id=player.player_id
        )

        # Return a success response
        return JsonResponse({'message': 'Player added to wishlist successfully.'}, status=201)

    except Exception as e:
        # If something goes wrong, return an error response
        return JsonResponse({'error': str(e)}, status=400)

@api.get("/watchlist", response={200: List[PlayerSchema], 404: NotFoundSchema})
def GetWishList(request):
    try:
        watchlist = Player.objects.all()
        if not watchlist:
            watchlist = []
            return JsonResponse({'message': 'No Players in wishlist.'}, stats=201), []
        
        return 200, watchlist
    except Exception as e:
        return 404, {"message": str(e)}
## TODO: Need to add routes for all-time leaders for each stat not just for a particular season

## might need to add a team paramter and if there is a team paramter we need to filter the df by that team and then sort by the stat potentially
