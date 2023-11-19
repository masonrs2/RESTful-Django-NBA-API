import json
import pandas as pd
from ninja import Router
from nba_api.stats.static import teams
from nba_api.stats.endpoints import leaguedashplayerstats
from .constants.constants import keep_columns
from .Enums.stats import Stats

router = Router()

# TODO: Add a route given a team and a type of stat, we will return the top 3 players on that team for that stat
# TODO: Add a route given a team and a type of stat, we will return the bottom 3 players on that team for that stat (given the player has played an average of at least 12 minutes per game) 

@router.get("/leadingScorers")
def leadingScorers(request):
    return get_player_stats("2023-24", Stats.POINTS_PER_GAME.value)

@router.get("/leadingAssists")
def leadingAssists(request):
    return get_player_stats("2023-24", Stats.ASSISTS.value)

@router.get("/leadingRebounds")
def leadingRebounds(request):
    return get_player_stats("2023-24", Stats.REBOUNDS.value)

@router.get("/leadingBlocks")
def leadingBlocks(request):
    return get_player_stats("2023-24", Stats.BLOCKS.value)

@router.get("/leadingSteals")
def leadingSteals(request):
    return get_player_stats("2023-24", Stats.STEALS.value)

@router.get("/team/{team}/leading{stat}")
def leadingStatsByTeam(request, team: str, stat: str):
    try:
        print("hello")
    except:
        print("hello")
    return

## TODO: Need to add routes for all-time leaders for each stat not just for a particular season

## might need to add a team paramter and if there is a team paramter we need to filter the df by that team and then sort by the stat potentially
def get_player_stats(season, sort_by):
    player_stats = leaguedashplayerstats.LeagueDashPlayerStats(season=season)

    df = player_stats.get_data_frames()[0]
    
    df = df[keep_columns]
    df[Stats.POINTS_PER_GAME.value] = df[Stats.POINTS.value] / df[Stats.GAMES_PLAYED.value]

    # might need to abstract these 2 lines into another function since there may be times where we need to sort by ascending order
    df_sorted = df.sort_values(by=[sort_by], ascending=False)
    sorted_json = df_sorted.to_json(orient='records')

    return sorted_json