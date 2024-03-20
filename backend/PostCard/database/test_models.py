from django.test import TestCase
from database import models


class GeolocationTestCase(TestCase):
    
    def setUp(self):
        models.Geolocation.objects.create(location="TEST LOCATION",latitude=0.0,longitude=0.0)
        
    def test_geolocation(self):
        """Testing Geolocation Generation Data"""
        testLoc = models.Geolocation.objects.get(location="TEST LOCATION")
        self.assertEqual(testLoc.latitude, 0.0)
        self.assertEqual(testLoc.longitude, 0.0)

    def tearDown(self):
        testLoc = models.Geolocation.objects.get(location="TEST LOCATION")
        testLoc.delete() 



class PostsTestCase(TestCase):
    def setUp(self):
        exampleLoc = models.Geolocation.objects.create(location="TEST LOCATION",latitude=0.0,longitude=0.0)
        exampleUser = models.User.objects.create(username="TEST",email="T@E.ST", password="TEST")
        models.Posts.objects.create(image="image.jpg", geolocID=exampleLoc,userid=exampleUser,caption="TEST")
        
    def test_post(self):
        """Testing Post Data"""
        from datetime import datetime
        import pytz
        timezone = pytz.timezone('Europe/London')
        currentDate = datetime.now(timezone).date()
        testPost = models.Posts.objects.get(userid=models.User.objects.get(username="TEST"))
        self.assertEqual(testPost.datetime.date(), currentDate)

    def tearDown(self):
        models.Posts.objects.get(userid=models.User.objects.get(username="TEST")).delete()
        models.Geolocation.objects.get(location="TEST LOCATION").delete()
        models.User.objects.get(username="TEST").delete()



class StickersTestCase(TestCase):
    
    def setUp(self):
        models.Stickers.objects.create(stickersName="TEST STICKER", fileName="TEST FILE NAME")
        
    def test_Sticker(self):
        testSticker = models.Stickers.objects.get(stickersName="TEST STICKER")
        self.assertEqual(testSticker.stickerPrice, 25)
        self.assertEqual(testSticker.stickersDescription, "sticker")

    def tearDown(self):
        testSticker = models.Stickers.objects.get(stickersName="TEST STICKER")
        testSticker.delete()      



class PostsUserTestCase(TestCase):
    
    def setUp(self):
        exampleSticker = models.Stickers.objects.create(stickersName="TEST STICKER", fileName="TEST FILE NAME")
        exampleLoc = models.Geolocation.objects.create(location="TEST LOCATION",latitude=0.0,longitude=0.0)
        exampleUser = models.User.objects.create(username="TEST",email="T@E.ST", password="TEST")
        examplePost = models.Posts.objects.create(image="image.jpg", geolocID=exampleLoc,userid=exampleUser,caption="TEST")
        examplePostUser = models.PostsUser.objects.create(
            userID = exampleUser
        )
        
    def test_userdata(self):
        """Testing User Data"""
        exampleUser = models.User.objects.get(username="TEST")
        exampleUserData = models.PostsUser.objects.get(userID=exampleUser)
        self.assertEqual(exampleUserData.coins, 0)
        self.assertEqual(str(exampleUserData.postID), "database.Posts.None") 
        self.assertEqual(str(exampleUserData.unlockedAvatars), "database.Stickers.None")
        self.assertEqual(str(exampleUserData.avatarInUse), "None")      
        self.assertEqual(exampleUserData.postsMade, 0)
        self.assertEqual(exampleUserData.postsSaved, 0)
        self.assertEqual(exampleUserData.postsMadeToday, 0)
        self.assertEqual(exampleUserData.postsSavedToday, 0)
        self.assertEqual(exampleUserData.youtubeLink, "")
        self.assertEqual(exampleUserData.twitterLink, "")
        self.assertEqual(exampleUserData.instagramLink, "")
        self.assertEqual(exampleUserData.bio, "")
    
    def tearDown(self):
        exampleUser = models.User.objects.get(username="TEST")
        models.PostsUser.objects.get(userID=exampleUser).delete()
        models.Posts.objects.get(userid=exampleUser).delete()        
        exampleUser.delete()
        models.Geolocation.objects.get(location="TEST LOCATION").delete()
        models.Stickers.objects.get(stickersName="TEST STICKER").delete()




class ChallengesTestCase(TestCase):
    
    def setUp(self):
        models.Challenges.objects.create(challengeDesc="TEST CHALLENGE")
        
    def test_challenge(self):
        testChallenge = models.Challenges.objects.get(challengeDesc="TEST CHALLENGE")
        self.assertEqual(testChallenge.postsNeeded, 9999999) 
        self.assertEqual(testChallenge.savesNeeded, 9999999)   
        self.assertEqual(testChallenge.inUse, False)
        self.assertEqual(testChallenge.type, "noneType")
        self.assertEqual(testChallenge.coinsRewarded, 0)    

    def tearDown(self):
        testChallenge = models.Challenges.objects.get(challengeDesc="TEST CHALLENGE")
        testChallenge.delete()       