from django.db import models
from django.contrib.auth.models import User #Importing django provided User model with build in authentication

# Each FK is set to on_delete = models.CASCADE to uphold DB integrity and consisentiy

class Geolocation(models.Model):
    geolocID = models.IntegerField(primary_key = True)
    location = models.CharField(max_length = 255)
    position = models.FloatField()

class Posts(models.Model):
    postId   = models.IntegerField()
    fileName = models.CharField(max_length = 255)
    geolocID = models.ForeignKey(Geolocation, on_delete = models.CASCADE)
    username = models.ForeignKey(User,        on_delete = models.CASCADE)
    caption  = models.CharField(max_length = 255)
    datetime = models.DateTimeField(auto_now_add = True) #Creates a timestap

class Stickers(models.Model):
    stickersID   = models.IntegerField(primary_key = True)
    stickersName = models.CharField(max_length = 50)
    stickersDescription = models.CharField(max_length = 100)
    fileName = models.CharField(max_length = 100)
    
class StickersUser(models.Model):
    StickersID = models.ForeignKey(Stickers, on_delete = models.CASCADE)
    username   = models.ForeignKey(User, on_delete = models.CASCADE)