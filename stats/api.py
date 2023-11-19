import json
import pandas as pd
from ninja import Router
from nba_api.stats.static import teams
from nba_api.stats.endpoints import leaguedashplayerstats

router = Router()

@router.get("/leadingScorers")
def leadingScoreres(request):
    player_stats = leaguedashplayerstats.LeagueDashPlayerStats(season="2023-24")

    df = player_stats.get_data_frames()[0]

    keep_columns = ['PLAYER_ID', 'PLAYER_NAME', 'NICKNAME', 'TEAM_ID', 'TEAM_ABBREVIATION',
        'AGE', 'GP', 'W', 'L', 'W_PCT', 'MIN', 'FGM', 'FGA', 'FG_PCT', 'FG3M',
        'FG3A', 'FG3_PCT', 'FTM', 'FTA', 'FT_PCT', 'OREB', 'DREB', 'REB', 'AST',
        'TOV', 'STL', 'BLK', 'BLKA', 'PF', 'PFD', 'PTS', 'PLUS_MINUS'] 

    df = df[keep_columns]
    df['PPG'] = df['PTS'] / df['GP']
    df_sorted = df.sort_values(by=['PPG'], ascending=False)

    sorted_json = df_sorted.to_json(orient='records')

    return sorted_json