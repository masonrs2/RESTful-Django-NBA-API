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
   - [team](file:///c%3A/Users/mason/Documents/Projects/Python/NBA/stats/stats/api.py#12%2C29-12%2C29): The team's full name, abbreviation, or nickname (case-insensitive).
   - [stat](file:///c%3A/Users/mason/Documents/Projects/Python/NBA/stats/stats/api.py#12%2C48-12%2C48): The stat to sort by (case-insensitive).
   - Example: `curl http://127.0.0.1:8000/api/stats/Lakers/pts`

2. `/api/leadingScorers`: Returns the leading scorers for the 2023-24 season.
   - Example: `curl http://127.0.0.1:8000/api/stats/leadingScorers`

3. `/api/leadingAssists`: Returns the leading players in assists for the 2023-24 season.
   - Example: `curl http://127.0.0.1:8000/api/stats/leadingAssists`
   
4. `/api/leadingScorers`: Returns the leading scorers for the 2023-24 season.
   - Example: `curl http://127.0.0.1:8000/api/stats/leadingSteals`

5. `/api/leadingAssists`: Returns the leading players in blocks for the 2023-24 season.
   - Example: `curl http://127.0.0.1:8000/api/stats/leadingBlocks`

6. `/api/leadingAssists`: Returns the leading players in rebounds for the 2023-24 season.
   - Example: `curl http://127.0.0.1:8000/api/stats/leadingRebounds`
