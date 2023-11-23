from django.db import models

class Player(models.Model):
    username = models.CharField(max_length=150, primary_key=True, default='default_username')
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    team = models.CharField(max_length=50)
    player_id = models.IntegerField() 