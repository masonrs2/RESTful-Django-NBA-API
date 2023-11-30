# RESTful-NBA-API

This project extends the NBA_API to provide more customizable data queries.

## Running the Project

1. Ensure you have Python and Django installed on your system.
2. Clone the repository: git clone https://github.com/masonrs2/RESTful-NBA-API.git
3. Navigate to the project directory: cd RESTful-NBA-API
4. Install dependencies (Django, django-dev python-decouple)
4. Install dependencies (Django, django-dev python-decouple, psycopg2, nba_api): `pip install -r requirements.txt`
5. Create a `.env` file in the project root directory and add your PostgreSQL database configurations:
DATABASE_NAME=your_database_name
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_database_password
DATABASE_HOST=your_database_host
DATABASE_PORT=your_database_port

6. Run the Django development server: `python manage.py runserver`
The server will start running at `http://127.0.0.1:8000/`. You can access the API endpoints from your web browser or a tool like curl or Postman.

## API Endpoints

1. /api/playerLeadingStats: Returns the leading players for a given stat for a specified season. You can specify any season in the format YYYY-YY. If no season is specified, the default season is the latest season (2023-24).
- stat: The stat to sort by (case-insensitive). This is a required parameter.
- season: The season in the format YYYY-YY. This is an optional parameter.
- Example: curl 'http://127.0.0.1:8000/api/playerLeadingStats?stat=PTS&season=2022-23'

2. /api/{team}/{stat}: Returns the players from the specified team who lead in the specified stat for the 2023-24 season.
- {team}: The team's full name, abbreviation, or nickname (case-insensitive). This is a required parameter.
- {stat}: The stat to sort by (case-insensitive). This is a required parameter.
- Example: curl 'http://127.0.0.1:8000/api/Lakers/pts'

3. /api/schedule: Returns the game results for a specified team for a given season. You can specify any season in the format YYYY-YY. If no season is specified, the default season is the latest season (2023-24).
- team: The team's full name, abbreviation, or nickname (case-insensitive). This is a required parameter.
- season: The season in the format YYYY-YY. This is an optional parameter.
- Example: curl 'http://127.0.0.1:8000/api/schedule?team=Lakers&season=2022-23'

4. /api/fantasyStats: Returns the fantasy stats for all players.
- No parameters required.
- Example: curl 'http://127.0.0.1:8000/api/fantasyStats'

5. /api/watchlist: POST request to add a player to the user's watchlist.
- player: The player details in JSON format. This is a required parameter.
- Example: curl -X POST -d '{"username": "username123", "first_name": "Lebron", "last_name": "James", "team": "Lakers", "player_id": 2544}' http://127.0.0.1:8000/api/watchlist

6. /api/watchlist: GET request to retrieve all players in the user's watchlist.
- username: The username of the user. This is a required parameter.
- Example: curl 'http://127.0.0.1:8000/api/watchlist?username=username123'

7. /api/watchlist: DELETE request to remove a player from the user's watchlist.
- player_id: The unique ID of the player. This is a required parameter.
- username: The username of the user. This is a required parameter.
- Example: curl -X DELETE 'http://127.0.0.1:8000/api/watchlist?player_id=2544&username=username123'

