from django.shortcuts import render
from rest_framework import generics
from database.models import Geolocation, Posts, Stickers, StickersUser
from PostCard.serializers import PostsSerializer, GeolocationSerializer, StickersSerializer, StickersUserSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


# creating the views based on the models, should be able to list and view the data
class PostsList(generics.ListCreateAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer
    permission_classes = [AllowAny]

class PostsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer
    permission_classes = [AllowAny]

class GeolocationList(generics.ListCreateAPIView):
    queryset = Geolocation.objects.all()
    serializer_class = GeolocationSerializer
    permission_classes = [AllowAny]

class GeolocationDetail(generics.RetrieveAPIView):
    queryset = Geolocation.objects.all()
    serializer_class = GeolocationSerializer
    permission_classes = [AllowAny]

class StickersList(generics.ListCreateAPIView):
    queryset = Stickers.objects.all()
    serializer_class = StickersSerializer
    permission_classes = [AllowAny]

class StickersDetail(generics.RetrieveAPIView):
    queryset = Stickers.objects.all()
    serializer_class = StickersSerializer
    permission_classes = [AllowAny]

class StickersUserList(generics.ListCreateAPIView):
    queryset = StickersUser.objects.all()
    serializer_class = StickersUserSerializer
    permission_classes = [AllowAny]

class StickersUserDetail(generics.RetrieveAPIView):
    queryset = StickersUser.objects.all()
    serializer_class = StickersUserSerializer
    permission_classes = [AllowAny]

@api_view(['POST']) # Secuirty purposes we dont want to append user details to header
@permission_classes([AllowAny]) # idk , doesnt work without it smh
def createPost(request):
    try:
        userid = request.user.id
    except:
        # if user is not logged in, then raise an error
        return Response({"message":"User not logged in"},status=status.HTTP_400_BAD_REQUEST)
    
    # Create a mutable copy of request.data
    request.data['userid'] = userid  # Add 'userid' key
    # data['userid'] = userid  # Add 'userid' key

    # Create a serializer instance with the mutable copy of request.data
    serialized = PostsSerializer(data=request.data)

    if serialized.is_valid():
        serialized.save()
        return Response({"message":"User made"},status=status.HTTP_201_CREATED) # Successful user creation
    else: 
        return Response(status=status.HTTP_400_BAD_REQUEST) # Failed user creation
        

@api_view(['POST']) # Secuirty purposes we dont want to append user details to header
@permission_classes([AllowAny]) # idk , doesnt work without it smh
def getUser(request):
    try:
        userid = request.user.id
        username = request.user.username
    except:
        # if user is not logged in, then raise an error
        return Response({"message":"User not logged in"},status=status.HTTP_400_BAD_REQUEST)
    return Response({"userid":userid,"username":username},status=status.HTTP_200_OK) # Successful user creation
    
from django.utils import timezone
from datetime import timedelta

@api_view(['POST','GET'])
@permission_classes([AllowAny])
def getPostsLast24Hours(request):
    try:
        current_time = timezone.now()
        time_24_hours_ago = current_time - timedelta(days=1)

        recent_posts = Posts.objects.filter(datetime__range=[time_24_hours_ago, current_time])
        serializer = PostsSerializer(recent_posts, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

