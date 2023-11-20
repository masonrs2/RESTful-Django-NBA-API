import json
import pandas as pd
from typing import Optional
from ninja import Router
from nba_api.stats.static import teams
from nba_api.stats.endpoints import leaguedashplayerstats, leaguegamefinder
from .constants.constants import keep_columns, all_stats_columns, GetTeamsDict, GetTeamsList
from .Enums.stats import Stats
from ninja.errors import HttpError

router = Router()

# TODO: Add a route given a team and a type of stat, we will return the bottom 3 players on that team for that stat (given the player has played an average of at least 12 minutes per game) 


## Should add the season parameter in all routes here instead of hard coding
@router.get("/leadingScorers")
def leadingScorers(request):
    return GetPlayerStats("2023-24", Stats.POINTS_PER_GAME.value)

@router.get("/leadingAssists")
def leadingAssists(request):
    return GetPlayerStats("2023-24", Stats.ASSISTS.value)

@router.get("/leadingRebounds")
def leadingRebounds(request):
    return GetPlayerStats("2023-24", Stats.REBOUNDS.value)

@router.get("/leadingBlocks")
def leadingBlocks(request):
    return GetPlayerStats("2023-24", Stats.BLOCKS.value)

@router.get("/leadingSteals")
def leadingSteals(request):
    return GetPlayerStats("2023-24", Stats.STEALS.value)

@router.get("/{team}/{stat}")
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

@router.get("/schedule")
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

## TODO: Get the W/L history for a specified team.

## TODO: Need to add routes for all-time leaders for each stat not just for a particular season

## might need to add a team paramter and if there is a team paramter we need to filter the df by that team and then sort by the stat potentially
def GetPlayerStats(season, sort_by):
    df = GetPlayerStatsDf(season)

    # might need to abstract these 2 lines into another function since there may be times where we need to sort by ascending order
    df_sorted = df.sort_values(by=[sort_by], ascending=False)
    sorted_json = df_sorted.to_json(orient='records')

    return sorted_json

def GetPlayerStatsDf(season):
    player_stats = leaguedashplayerstats.LeagueDashPlayerStats(season=season)
    df = player_stats.get_data_frames()[0]
    df = df[keep_columns]
    df[Stats.POINTS_PER_GAME.value] = df[Stats.POINTS.value] / df[Stats.GAMES_PLAYED.value]
    return df