# RESTful-NBA-API

This project extends the NBA_API to provide more customizable data queries.

## Running the Project

1. Ensure you have Python and Django installed on your system.
2. Clone the repository: git clone https://github.com/masonrs2/RESTful-NBA-API.git
3. Navigate to the project directory: cd RESTful-NBA-API
4. Run the Django development server: python manage.py runserver

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

3. `/api/leadingScorers`: Returns the leading scorers for the 2023-24 season.
   - Example: `curl http://127.0.0.1:8000/api/stats/leadingScorers`

4. `/api/leadingAssists`: Returns the leading players in assists for the 2023-24 season.
   - Example: `curl http://127.0.0.1:8000/api/stats/leadingAssists`
   
5. `/api/leadingScorers`: Returns the leading scorers for the 2023-24 season.
   - Example: `curl http://127.0.0.1:8000/api/stats/leadingSteals`

6. `/api/leadingAssists`: Returns the leading players in blocks for the 2023-24 season.
   - Example: `curl http://127.0.0.1:8000/api/stats/leadingBlocks`

7. `/api/leadingAssists`: Returns the leading players in rebounds for the 2023-24 season.
   - Example: `curl http://127.0.0.1:8000/api/stats/leadingRebounds`


