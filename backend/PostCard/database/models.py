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
    
# TODO
#   Use for sticker-user association for a lighter UserData table
class StickersUser(models.Model):
    id = models.AutoField(primary_key=True)
    stickersID = models.ForeignKey(Stickers, on_delete = models.CASCADE)
    username   = models.ForeignKey(User, on_delete = models.CASCADE)

# TODO
#   Rename table to UserData
class PostsUser(models.Model):
    userID = models.OneToOneField(User,  on_delete = models.CASCADE)
    coins = models.PositiveIntegerField(default=0)
    postID = models.ManyToManyField(Posts,blank=True)
    unlockedAvatars = models.ManyToManyField(Stickers, blank=True ,related_name="unlocked")
    avatarInUse = models.ForeignKey(Stickers,related_name="profile_pic", on_delete = models.CASCADE, null=True, blank=True)
    postsMade = models.PositiveIntegerField(default=0)
    postsSaved = models.PositiveIntegerField(default=0)
    postsMadeToday = models.PositiveSmallIntegerField(default=0, validators=[MaxValueValidator(48)])
    postsSavedToday = models.PositiveSmallIntegerField(default=0)
    youtubeLink = models.CharField(max_length = 255, default="",blank = True)
    twitterLink = models.CharField(max_length = 255, default="",blank = True)
    instagramLink = models.CharField(max_length = 255,default="", blank = True)
    bio = models.CharField(max_length = 255, default="",blank = True)


class Challenges(models.Model):
    id = models.AutoField(primary_key=True)
    challengeDesc = models.CharField(max_length = 100)
    postsNeeded = models.PositiveSmallIntegerField(default=9999999)
    savesNeeded = models.PositiveSmallIntegerField(default=9999999)
    inUse = models.BooleanField(default=False)
    type = models.CharField(max_length=20, blank = True, default="noneType")
    coinsRewarded = models.PositiveIntegerField(default=0)

class CurrentDay(models.Model):
    dateOfLastInteraction = models.DateField(default="1111-11-11")