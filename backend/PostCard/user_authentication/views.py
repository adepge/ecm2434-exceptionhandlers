from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegisterSerializer , UserLoginSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import *

from rest_framework.authtoken.models import Token 
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

@api_view(['POST']) # We only want to recieve POST requests here, GET REQUESTS ARE INVALID!
@permission_classes([AllowAny])

def UserRegisterAuthentication(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data.get('username')
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')
        user_instance = User(username=username,email=email)
        user_instance.set_password(password)
        user_instance.save()
        
        return Response({"message":"User made"},status=status.HTTP_201_CREATED)    # Successful user creation
    else: 
        return Response(status=status.HTTP_400_BAD_REQUEST) # Failed user creation


@api_view(['POST']) # Secuirty purposes we dont want to append user details to header
@permission_classes([AllowAny]) # idk , doesnt work without it smh
def UserLoginAuthentication(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)
    else:
        return Response({"username": "Invalid credentials"}, status=status.HTTP_404_NOT_FOUND)
     