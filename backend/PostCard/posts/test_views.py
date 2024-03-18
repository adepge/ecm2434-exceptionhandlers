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
        
        # Adjust the login method according to your authentication setup
        #self.client.force_authenticate(user=self.user1)


        # Create test data for models
        self.geolocation = Geolocation.objects.create(location='Test Location', latitude=10.0, longitude=20.0)
        self.post = Posts.objects.create(caption='Test Post', geolocID=self.geolocation, userid=self.user1)
        self.sticker = Stickers.objects.create(stickersName='Test Sticker', stickerPrice=0, fileName='NULL')
        self.postUser = PostsUser.objects.create(userID=self.user1, bio='Test Bio')
        self.challenge = Challenges.objects.create(postsNeeded=5, coinsRewarded=25, challengeDesc="Create 5 posts", type="daily")

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

    