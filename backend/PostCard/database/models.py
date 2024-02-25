from django.db import models
from django.contrib.auth.models import User #Importing django provided User model with build in authentication

# Each FK is set to on_delete = models.CASCADE to uphold DB integrity and consisentiy

class Geolocation(models.Model):
    id = models.AutoField(primary_key=True)
    location = models.CharField(max_length=255)
    latitude = models.FloatField(max_length=255)
    longitude = models.FloatField(max_length=255)
    latitude = models.FloatField(default=0.0)
    longitude = models.FloatField(default=0.0)
    def __str__(self):
        return f"{self.location} (Lat: {self.latitude}, Lng: {self.longitude})"
    
class Posts(models.Model):
    id   = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='media')
    geolocID = models.ForeignKey(Geolocation, on_delete = models.CASCADE)
    username = models.ForeignKey(User,        on_delete = models.CASCADE)
    caption  = models.CharField(max_length = 255)
    datetime = models.DateTimeField(auto_now_add = True) #Creates a timestamp

class PostsUser(models.Model):
    id = models.AutoField(primary_key=True)
    postid = models.ForeignKey(Posts, on_delete = models.CASCADE)
    userid   = models.ForeignKey(User, on_delete = models.CASCADE)    

class Stickers(models.Model):
    id   = models.AutoField(primary_key=True)
    stickersName = models.CharField(max_length = 50)
    stickersDescription = models.CharField(max_length = 100)
    fileName = models.CharField(max_length = 100)
    
class StickersUser(models.Model):
    id = models.AutoField(primary_key=True)
    stickersID = models.ForeignKey(Stickers, on_delete = models.CASCADE)
    username   = models.ForeignKey(User, on_delete = models.CASCADE)