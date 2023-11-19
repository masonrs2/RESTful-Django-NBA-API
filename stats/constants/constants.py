from nba_api.stats.static import teams

keep_columns = [
    'PLAYER_ID', 'PLAYER_NAME', 'NICKNAME', 'TEAM_ID', 'TEAM_ABBREVIATION',
    'AGE', 'GP', 'W', 'L', 'W_PCT', 'MIN', 'FGM', 'FGA', 'FG_PCT', 'FG3M',
    'FG3A', 'FG3_PCT', 'FTM', 'FTA', 'FT_PCT', 'OREB', 'DREB', 'REB', 'AST',
    'TOV', 'STL', 'BLK', 'BLKA', 'PF', 'PFD', 'PTS', 'PLUS_MINUS','NBA_FANTASY_PTS', 'PLUS_MINUS_RANK', 'NBA_FANTASY_PTS_RANK'
] 

def GetTeamsList():
    teams = teams.get_teams()
    teams_info = [item for team in teams for item in [team['full_name'], team['abbreviation'], team['nickname'], team['city']]]
    return teams_info

def GetTeamsDict():
    teams = teams.get_teams()
    team_dict = {team['abbreviation']: {'id': team['id'], 'full_name': team['full_name'], 'nickname': team['nickname'], 'city': team['city'], 'state': team['state'], 'year_founded': team['year_founded']} for team in teams}
    return team_dict

