from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from database.models import Geolocation, Posts, Stickers, PostsUser, Challenges
from django.contrib.auth.models import User
from .views import *
from django.core.files.uploadedfile import SimpleUploadedFile

# USE python  manage.py test --pattern="test_views.py"
class PostCardTests(TestCase):
    def setUp(self):
        # Create a test client for making API requests
        self.client = APIClient()

        # Create test users
        self.user1 = User.objects.create_user(username='user1', password='pass')
        self.user2 = User.objects.create_user(username='user2', password='pass')
        self.geolocation = Geolocation.objects.create(location='Test Location', latitude=10.0, longitude=20.0)

        self.super_user = User.objects.create_superuser(username='superuser', password='superpass')
        
        # Adjust the login method according to your authentication setup
        self.client.force_authenticate(user=self.user1)


        # Create test data for models
        self.geolocation = Geolocation.objects.create(location='Test Location', latitude=10.0, longitude=20.0)
        self.post = Posts.objects.create(caption='Test Post', geolocID=self.geolocation, userid=self.user1)
        self.sticker = Stickers.objects.create(stickersName='Test Sticker', stickerPrice=0, fileName='NULL')
        self.sticker1 = Stickers.objects.create(stickersName='Avatar1', stickerPrice=100, fileName='NULL')
        self.sticker2 = Stickers.objects.create(stickersName='Avatar2', stickerPrice=100, fileName='NULL')
        self.postUser = PostsUser.objects.create(userID=self.user1, bio='Test Bio')
        self.challenge = Challenges.objects.create(postsNeeded=5, coinsRewarded=25, challengeDesc="Create 5 posts", type="daily")
        self.postUser.unlockedAvatars.add(self.sticker1)

        self.daily_challenge = Challenges.objects.create(
            postsNeeded=5, savesNeeded=0, coinsRewarded=25, challengeDesc="Create 5 posts", type="daily", inUse=True)
        self.milestone_challenge_1 = Challenges.objects.create(
            postsNeeded=35, savesNeeded=0, coinsRewarded=250, challengeDesc="Create 35 posts", type="milestone", inUse=True)
        self.milestone_challenge_2 = Challenges.objects.create(
            postsNeeded=0, savesNeeded=35, coinsRewarded=250, challengeDesc="Save 35 posts", type="milestone", inUse=True)

    def test_get_avatar(self):
        # Test getting all posts
        response = PostsUser.objects.get(userID=self.user1)
        print(response)
        # self.assertEqual(response.status_code, status.HTTP_200_OK)
        # self.assertEqual(len(response.data), 1)

    def test_get_posts(self):
        # Test getting all posts
        response = self.client.get(reverse('posts-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_post(self):
    # Use a real image file's path or include a valid image file in your test directory
        image_path = r'./media/media/Avatar/crown.png'
        with open(image_path, 'rb') as img:
            image_data = img.read()
        
        image = SimpleUploadedFile('test_image.png', image_data, content_type='image/png')
        data = {
            'userid': self.user1.id,  # Use the correct field name and dynamically set the value
            'caption': 'A new post',
            'geolocID': self.geolocation.id,
            'image': image,
        }

        self.client.force_authenticate(user=self.user1)  # Ensure authentication is set
        response = self.client.post(reverse('posts-list'), data, format='multipart')
        
        print(response.data)  # To debug in case of errors
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    
    def test_change_bio(self):
        # Login as user1 to perform the bio update
        self.client.force_authenticate(user=self.user1)
        # Define the new bio and social media links
        new_bio_data = {
            'bio': 'Updated Bio',
            'youtube': 'http://youtube.com/newuser1',
            'twitter': 'http://twitter.com/newuser1',
            'instagram': 'http://instagram.com/newuser1',
        }
        # Make a POST request to the changeBio endpoint
        response = self.client.post(reverse('change-bio'), new_bio_data, format='json')
        # Assert that the response status code is HTTP 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Fetch the updated PostsUser object from the database
        updated_user_info = PostsUser.objects.get(userID=self.user1.id)
        # Assert that the PostsUser object has been updated with the new bio and social media links
        self.assertEqual(updated_user_info.bio, new_bio_data['bio'])
        self.assertEqual(updated_user_info.youtubeLink, new_bio_data['youtube'])
        self.assertEqual(updated_user_info.twitterLink, new_bio_data['twitter'])
        self.assertEqual(updated_user_info.instagramLink, new_bio_data['instagram'])


    # def test_get_user_profile(self):
    #     # Authenticate as user1
    #     self.client.force_authenticate(user=self.user1)
        
    #     # Make a GET request to the 'get-user' endpoint
    #     response = self.client.get(reverse('user-list'))
        
    #     # Verify the response status code is 200 OK
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    #     # Check if the response contains the expected data
    #     expected_fields = ['username', 'coins', 'profilePicture', 'Bio', 'youtube', 'instagram', 'twitter']
    #     for field in expected_fields:
    #         self.assertIn(field, response.data)
        
    #     # Optionally, verify the values of certain fields
    #     self.assertEqual(response.data['username'], self.user1.username)
    #     # You can add more assertions here to verify other fields like 'coins', 'Bio', etc.


    def test_get_all_users(self):
        # Authenticate as the superuser
        self.client.force_authenticate(user=self.super_user)

        # Make the GET request to the 'get-all-users' endpoint
        response = self.client.get(reverse('all-users'))

        # Check that the response status code is 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Optionally, check the content of the response
        # For example, verify the number of users returned matches the expected number
        expected_user_count = User.objects.count()
        self.assertEqual(len(response.data), expected_user_count)

        # Further checks can include verifying the content of the returned data
        # This might involve checking that the data for the superuser is correct, etc.
        # Example:
        super_user_data = next((item for item in response.data if item["username"] == "superuser"), None)
        self.assertIsNotNone(super_user_data)
        self.assertTrue(super_user_data['is_superuser'])
    
    def test_get_all_avatars(self):
        # Make a GET request to the 'get-all-avatars' endpoint
        response = self.client.get(reverse('get-all-avatars'))

        # Check that the response status code is 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check the response contains the avatar owned by user1
        owned_avatar_names = [avatar['name'] for avatar in response.data]
        self.assertIn('Avatar1', owned_avatar_names)
        self.assertNotIn('Avatar2', owned_avatar_names)  # Assuming user1 does not own Avatar2

    def test_get_avatars(self):
        # Make a GET request to the 'get-avatars' endpoint
        response = self.client.get(reverse('get-avatars'))

        # Check that the response status code is 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check the response contains avatars NOT owned by user1 (e.g., Avatar2)
        not_owned_avatar_names = [avatar['name'] for avatar in response.data]
        self.assertNotIn('Avatar1', not_owned_avatar_names)  # User1 owns Avatar1, so it should not be in the list
        self.assertIn('Avatar2', not_owned_avatar_names)  # Assuming user1 does not own Avatar2

    def test_get_challenges(self):
        # Authenticate as user1
        self.client.force_authenticate(user=self.user1)
        
        # Make a GET request to the 'get-challenges' endpoint
        response = self.client.get(reverse('get-challenges'))
        
        # Verify the response status code is 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check if the response contains the expected data
        self.assertIn('DailyChallenge', response.data)
        self.assertIn('DailyCoinsRewarded', response.data)
        self.assertIn('Milestone1Challenge', response.data)
        self.assertIn('Milestone1CoinsRewarded', response.data)
        self.assertIn('Milestone2Challenge', response.data)
        self.assertIn('Milestone2CoinsRewarded', response.data)

        # Optionally, verify the details of the challenges
        self.assertEqual(response.data['DailyChallenge'], self.daily_challenge.challengeDesc)
        self.assertEqual(response.data['Milestone1Challenge'], self.milestone_challenge_1.challengeDesc)
        self.assertEqual(response.data['Milestone2Challenge'], self.milestone_challenge_2.challengeDesc)



    def tearDown(self):
        # Cleanup code to remove uploaded image files after each test
        super().tearDown()
        PostsUser.objects.filter(userID=self.user1).delete()    
        for post in Posts.objects.all():
            if post.image:
                post.image.delete(save=False)  # This deletes the file from storag

    
        
    # NEED TEST VIEWS FOR COLLECTIONS, AND DELETE