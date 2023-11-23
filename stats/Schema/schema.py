from ninja import Schema

class PlayerSchema(Schema):
    username: str
    first_name: str
    last_name: str
    team: str
    player_id: int

class NotFoundSchema(Schema):
    message: str