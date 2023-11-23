from stats.Models import Player
from nba_api.stats.endpoints import leaguedashplayerstats
from stats.constants.constants import keep_columns
from stats.Enums.stats import Stats
import pandas as pd

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

