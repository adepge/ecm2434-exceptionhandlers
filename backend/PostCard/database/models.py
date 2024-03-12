from django.db import models
from django.core.validators import MaxValueValidator
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
    userid = models.ForeignKey(User, on_delete = models.CASCADE)
    caption  = models.CharField(max_length = 255)
    datetime = models.DateTimeField(auto_now_add = True) #Creates a timestamp

# TODO
#   Rename table to "Avatars"
#   Rename stickersName to avatarName
#   Delete stickersDescription

class Stickers(models.Model):
    id   = models.AutoField(primary_key=True)
    stickersName = models.CharField(max_length = 50)
    stickerPrice = models.IntegerField(default = 25)
    stickersDescription = models.CharField(default ="sticker",max_length = 100)
    fileName = models.CharField(max_length = 100)
    

class StickersUser(models.Model):
    id = models.AutoField(primary_key=True)
    stickersID = models.ForeignKey(Stickers, on_delete = models.CASCADE)
    username   = models.ForeignKey(User, on_delete = models.CASCADE)    
# the post user has collected
# {userid: 1, postids: [1,2,3,4,5]}
# TODO
#   Rename table to UserData
class PostsUser(models.Model):
    userID = models.ForeignKey(User,  on_delete = models.CASCADE)
    coins = models.PositiveIntegerField(default=0)
    postID = models.ManyToManyField(Posts)
    unlockedAvatars = models.ManyToManyField(Stickers ,related_name="unlocked")
    avatar_free = models.ManyToManyField(Stickers)
    avatarInUse = models.ForeignKey(Stickers, default = 1,related_name="profile_pic", on_delete = models.CASCADE)
    stepsTaken = models.PositiveBigIntegerField(default=0)
    postsMade = models.PositiveIntegerField(default=0)
    postsSaved = models.PositiveIntegerField(default=0)
    stepsTakenToday = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(30000)])
    postsMadeToday = models.PositiveSmallIntegerField(default=0, validators=[MaxValueValidator(48)])
    postsSavedToday = models.PositiveSmallIntegerField(default=0)

class Challenges(models.Model):
    id = models.AutoField(primary_key=True)
    challengeDesc = models.CharField(max_length = 100)
    stepsNeeded = models.PositiveIntegerField(default=9999999)
    postsNeeded = models.PositiveSmallIntegerField(default=0)
    savesNeeded = models.PositiveSmallIntegerField(default=0)
    inUse = models.BooleanField(default=False)
    coinsRewarded = models.PositiveIntegerField(default=0)

class CurrentDay(models.Model):
    dateOfLastInteraction = models.DateField(default="1111-11-11")