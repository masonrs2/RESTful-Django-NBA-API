from nba_api.stats.static import teams

keep_columns = [
    'PLAYER_ID', 'PLAYER_NAME', 'NICKNAME', 'TEAM_ID', 'TEAM_ABBREVIATION',
    'AGE', 'GP', 'W', 'L', 'W_PCT', 'MIN', 'FGM', 'FGA', 'FG_PCT', 'FG3M',
    'FG3A', 'FG3_PCT', 'FTM', 'FTA', 'FT_PCT', 'OREB', 'DREB', 'REB', 'AST',
    'TOV', 'STL', 'BLK', 'BLKA', 'PF', 'PFD', 'PTS', 'PLUS_MINUS','NBA_FANTASY_PTS', 'PLUS_MINUS_RANK', 'NBA_FANTASY_PTS_RANK'
] 

all_stats_columns = [
    'PLAYER_ID', 'PLAYER_NAME', 'NICKNAME', 'TEAM_ID', 'TEAM_ABBREVIATION',
    'AGE', 'GP', 'W', 'L', 'W_PCT', 'MIN', 'FGM', 'FGA', 'FG_PCT', 'FG3M',
    'FG3A', 'FG3_PCT', 'FTM', 'FTA', 'FT_PCT', 'OREB', 'DREB', 'REB', 'AST',
    'TOV', 'STL', 'BLK', 'BLKA', 'PF', 'PFD', 'PTS', 'PLUS_MINUS','NBA_FANTASY_PTS', 'PLUS_MINUS_RANK', 'NBA_FANTASY_PTS_RANK', 'PPG'
] 

def GetTeamsList():
    teams_data = teams.get_teams()
    teams_info = [item for team in teams_data for item in [team['full_name'], team['abbreviation'], team['nickname'], team['city']]]
    return teams_info

def GetTeamsDict():
    teams_data = teams.get_teams()
    team_dict = {
        team['abbreviation'].lower(): 
             {
                'id': team['id'], 
                'full_name': team['full_name'].lower(), 
                'nickname': team['nickname'].lower(), 
                'city': team['city'].lower(), 
                'state': team['state'].lower(), 
                'year_founded': team['year_founded']
              } 
    for team in teams_data
    }
    return team_dict