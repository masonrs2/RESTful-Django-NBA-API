from ninja import Schema

class PlayerSchema(Schema):
    first_name: str
    last_name: str
    team: str
    player_id: int

class NotFoundSchema(Schema):
    message: str