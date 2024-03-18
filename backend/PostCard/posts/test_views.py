from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from database.models import Geolocation, Posts, Stickers, PostsUser, Challenges
from django.contrib.auth.models import User
from .views import *
# USE python  manage.py test --pattern="test_views.py"
class PostCardTests(TestCase):
    def setUp(self):
        # Create a test client for making API requests
        self.client = APIClient()

        # Create test users
        self.user1 = User.objects.create_user(username='user1', password='pass')
        self.user2 = User.objects.create_user(username='user2', password='pass')

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

    def test_get_user(self):
        # Test getting a user profile
        self.client.force_authenticate(user=self.user1)
        response = self.client.get(reverse('get-user'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'user1')

    # def test_create_post(self):
    #     # Test creating a post
    #     self.client.force_authenticate(user=self.user1)
    #     data = {'caption': 'New Post', 'geolocID': self.geolocation.id, 'image': 'backend\PostCard\media\media\Avatar\crown.png'}
    #     response = self.client.post(reverse('create-post'), data, format='multipart')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # def test_purchase_sticker(self):
    #     # Test purchasing a sticker
    #     self.client.force_authenticate(user=self.user1)
    #     data = {'sticker': 'Test Sticker'}
    #     response = self.client.post(reverse('purchase-sticker'), data)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_challenges(self):
    #     # Test retrieving challenges
    #     self.client.force_authenticate(user=self.user1)
    #     response = self.client.get(reverse('get-challenges'))
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def tearDown(self):
    #     # Clean up any created test data
    #     User.objects.all().delete()
    #     Geolocation.objects.all().delete()
    #     Posts.objects.all().delete()
    #     Stickers.objects.all().delete()
    #     PostsUser.objects.all().delete()
    #     Challenges.objects.all().delete()

