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

1. `/api/{team}/{stat}`: Returns the players from the specified team who lead in the specified stat for the 2023-24 season.
   - [team] The team's full name, abbreviation, or nickname (case-insensitive).
   - [stat] The stat to sort by (case-insensitive).
   - Example: `curl http://127.0.0.1:8000/api/stats/Lakers/pts`

2. `/api/schedule`: Returns the game results for a specified team for the 2023-24 season.
   - `team`: The team's full name, abbreviation, or nickname (case-insensitive). This is a required parameter.
   - `season`: The season for which to get game results. This is an optional parameter. If not provided, the default season is 2023-24.
   - Example: `curl http://127.0.0.1:8000/api/schedule?team=Lakers` (This example defaults season=2023 since no input for the parameter was given)

3. `/api/leadingScorers`: Returns the leading players in points for a given season entered by the user. You can specify any season in the format YYYY-YY. If no season is specified, the default season is the latest season (2023-24).
   - [stat] The stat to sort by (case-insensitive).
   - `season`: The season in the format YYYY-YY. This is an optional parameter.
   - Example: `curl http://127.0.0.1:8000/api/stats/leadingScorers?season=2022-23`

4. `/api/leadingAssists`: Returns the leading players in assists for a given season. You can specify any season in the format YYYY-YY. If no season is specified, the default season is the latest season (2023-24).
   - [season]: The season in the format YYYY-YY. This is an optional parameter.
   - Example: `curl http://127.0.0.1:8000/api/stats/leadingAssists?season=2022-23`

5. `/api/leadingRebounds`: Returns the leading players in rebounds for a given season. You can specify any season in the format YYYY-YY. If no season is specified, the default season is the latest season (2023-24).
   - [season]: The season in the format YYYY-YY. This is an optional parameter.
   - Example: `curl http://127.0.0.1:8000/api/stats/leadingRebounds?season=2022-23`

6. `/api/leadingBlocks`: Returns the leading players in blocks for a given season. You can specify any season in the format YYYY-YY. If no season is specified, the default season is the latest season (2023-24).
   - [season]: The season in the format YYYY-YY. This is an optional parameter.
   - Example: `curl http://127.0.0.1:8000/api/stats/leadingBlocks?season=2022-23`

7. `/api/leadingSteals`: Returns the leading players in steals for a given season. You can specify any season in the format YYYY-YY. If no season is specified, the default season is the latest season (2023-24).
   - [season]: The season in the format YYYY-YY. This is an optional parameter.
   - Example: `curl http://127.0.0.1:8000/api/stats/leadingSteals?season=2022-23`

8. `/api/wishlist`: POST request to add a player to the user's watchlist.
   - [first_name]: The first name of the player. This is a required parameter.
   - [last_name]: The last name of the player. This is a required parameter.
   - [team]: The team of the player. This is a required parameter.
   - [player_id]: The unique ID of the player. This is a required parameter.
   - Example: `curl -X POST -d '{"username": "username123", "first_name": "Lebron", "last_name": "James", "team": "Lakers", "player_id": 2544}' http://127.0.0.1:8000/api/watchlist`

9. `/api/wishlist`: GET request to retrieve all players in the user's watchlist.
   - No parameters required.
   - Example: `curl http://127.0.0.1:8000/api/watchlist`

10. [/api/watchlist] DELETE request to remove a player from the user's watchlist.
   - [player_id]: The unique ID of the player. This is a required parameter.
   - [username]: The username of the user. This is a required parameter.
   - Example: `curl -X DELETE 'http://127.0.0.1:8000/api/watchlist?player_id=2544&username=username123'`


