from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from database.models import Geolocation, Posts, Stickers, PostsUser, Challenges
from django.contrib.auth.models import User
from .views import *
from django.core.files.uploadedfile import SimpleUploadedFile

# USE follwing code to run: python  manage.py test --pattern="test_views.py"



class PostCardTests(TestCase):
    def setUp(self):
        # Create a test client for making API requests
        self.client = APIClient()
        self.user1 = User.objects.create_user(username='user1', password='pass')
        self.user2 = User.objects.create_user(username='user2', password='pass')
        self.geolocation = Geolocation.objects.create(location='Test Location', latitude=10.0, longitude=20.0)
        self.super_user = User.objects.create_superuser('superuser', 'superuser@example.com', 'superpassword')
        self.user_to_delete = User.objects.create_user(username='todelete', password='testpass')
        self.client.force_authenticate(user=self.user1)
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
        self.posts_user = PostsUser.objects.get(userID=self.user1)
        self.posts_user.postID.add(self.post)


    def test_get_avatar(self):
        # Test getting all posts
        response = PostsUser.objects.get(userID=self.user1)
        print(response)
        

    def test_get_posts(self):
        # Test getting all posts
        response = self.client.get(reverse('posts-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        print(response, response.data)

    def test_create_post(self):
    # Use a real image file's path or include a valid image file in your test directory
        image_path = r'./media/media/Avatar/crown.png'
        with open(image_path, 'rb') as img:
            image_data = img.read()
        
        image = SimpleUploadedFile('test_image.png', image_data, content_type='image/png')
        data = {
            'userid': self.user1.id,  
            'caption': 'A new post',
            'geolocID': self.geolocation.id,
            'image': image,
        }

        self.client.force_authenticate(user=self.user1)  
        response = self.client.post(reverse('posts-list'), data, format='multipart')
        print(response.data)  
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
        print(response, response.data)

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
        expected_user_count = User.objects.count()
        self.assertEqual(len(response.data), expected_user_count)
        super_user_data = next((item for item in response.data if item["username"] == "superuser"), None)
        self.assertIsNotNone(super_user_data)
        self.assertTrue(super_user_data['is_superuser'])
        print(response, response.data)

    def test_get_all_avatars(self):
        # Make a GET request to the 'get-all-avatars' endpoint
        response = self.client.get(reverse('get-all-avatars'))
        # Check that the response status code is 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Check the response contains the avatar owned by user1
        owned_avatar_names = [avatar['name'] for avatar in response.data]
        self.assertIn('Avatar1', owned_avatar_names)
        self.assertNotIn('Avatar2', owned_avatar_names)  # Assuming user1 does not own Avatar2
        print(response)


    def test_get_avatars(self):
        # Make a GET request to the 'get-avatars' endpoint
        response = self.client.get(reverse('get-avatars'))
        # Check that the response status code is 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Check the response contains avatars NOT owned by user1 (e.g., Avatar2)
        not_owned_avatar_names = [avatar['name'] for avatar in response.data]
        self.assertNotIn('Avatar1', not_owned_avatar_names)  # User1 owns Avatar1, so it should not be in the list
        self.assertIn('Avatar2', not_owned_avatar_names)  # Assuming user1 does not own Avatar2
        print(response)

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
        self.assertEqual(response.data['DailyChallenge'], self.daily_challenge.challengeDesc)
        self.assertEqual(response.data['Milestone1Challenge'], self.milestone_challenge_1.challengeDesc)
        self.assertEqual(response.data['Milestone2Challenge'], self.milestone_challenge_2.challengeDesc)
        print(response, response.data)


    def tearDown(self):
        super().tearDown()
        PostsUser.objects.filter(userID=self.user1).delete()    
        for post in Posts.objects.all():
            if post.image:
                post.image.delete(save=False)  # This deletes the file from storag

    
        
    # def test_add_collection(self):
    #     # Simulate adding a post to the user's collection
    #     response = self.client.post(reverse('add-collection'), {'postid': self.post.id}, format='json')
        
    #     # Check that the response indicates success
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    #     self.assertIn("Post added to collection", response.data["message"])
        
    #     # Verify the post is added to the user's collection
    #     user_collection = PostsUser.objects.get(userID=self.user).postID.all()
    #     self.assertIn(self.post, user_collection)

    #     # Optionally, check challenge updates if relevant
    #     user_profile = PostsUser.objects.get(userID=self.user)
    #     self.assertEqual(user_profile.postsSavedToday, 1)
    #     self.assertEqual(user_profile.postsSaved, 1)
        

    def test_get_collections_with_saved_posts(self):
        response = self.client.get(reverse('collected-posts'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Expecting one saved post
        self.assertEqual(response.data[0]['caption'], 'Test Post')  # Ensure the correct post is returned
        print(response, response.data)

    def test_get_collections_without_saved_posts(self):
        # Remove all saved posts for this test
        self.posts_user.postID.clear()
        response = self.client.get(reverse('collected-posts'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)  # Expecting no saved posts
        print(response, response.data)
    
    def test_delete_post(self):
        # Authenticate as a superuser since the view requires IsSuperUser permission
        self.client.force_authenticate(user=self.super_user)
        # Create a post to delete
        post_to_delete = Posts.objects.create(caption='Delete Me', geolocID=self.geolocation, userid=self.user1)
        # Make the DELETE request to the 'delete-post' endpoint with the post's id
        response = self.client.delete(reverse('deletePost', kwargs={'pk': post_to_delete.id}))
        # Check that the response indicates success (HTTP 204 No Content)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaises(Posts.DoesNotExist):
            Posts.objects.get(pk=post_to_delete.id)
        print(response, response.data)

    def test_delete_user(self):
        # Authenticate as the superuser
        self.client.force_authenticate(user=self.super_user)
        # Make the DELETE request to the 'delete-user' endpoint with the user's id to be deleted
        response = self.client.delete(reverse('deleteUser', kwargs={'pk': self.user_to_delete.pk}))
        # Check that the response indicates success (HTTP 204 No Content)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaises(User.DoesNotExist):
            User.objects.get(pk=self.user_to_delete.pk)
        print(response, response.data)