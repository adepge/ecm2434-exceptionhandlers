from django.shortcuts import render
from rest_framework import generics
from .models import Geolocation, Posts, Stickers, StickersUser
from PostCard.serializers import PostsSerializer, GeolocationSerializer, StickersSerializer, StickersUserSerializer

class PostsList(generics.ListCreateAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer

class PostsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer

class GeolocationList(generics.ListAPIView):
    queryset = Geolocation.objects.all()
    serializer_class = GeolocationSerializer

class GeolocationDetail(generics.RetrieveAPIView):
    queryset = Geolocation.objects.all()
    serializer_class = GeolocationSerializer

class StickersList(generics.ListAPIView):
    queryset = Stickers.objects.all()
    serializer_class = StickersSerializer

class StickersDetail(generics.RetrieveAPIView):
    queryset = Stickers.objects.all()
    serializer_class = StickersSerializer

class StickersUserList(generics.ListAPIView):
    queryset = StickersUser.objects.all()
    serializer_class = StickersUserSerializer

class StickersUserDetail(generics.RetrieveAPIView):
    queryset = StickersUser.objects.all()
    serializer_class = StickersUserSerializer