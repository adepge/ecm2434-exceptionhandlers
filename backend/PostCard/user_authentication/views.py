from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegisterSerializer , UserLoginSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import *

from rest_framework.authtoken.models import Token 
from django.contrib.auth import authenticate


@api_view(['POST']) # We only want to recieve POST requests here, GET REQUESTS ARE INVALID!
@permission_classes([AllowAny])

def UserRegisterAuthentication(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save() # Account is made and save to the database, test by checking the admin page / querying to DB
        return Response(serializer.errors,status=status.HTTP_201_CREATED)    # Successful user creation
    else: 
        return Response(status=status.HTTP_400_BAD_REQUEST) # Failed user creation


@api_view(['POST']) # Secuirty purposes we dont want to append user details to header
@permission_classes([AllowAny]) # idk , doesnt work without it smh
def UserLoginAuthentication(request):
    
    serializer = UserLoginSerializer(data=request.data)
    password = serializer.validated_data.get('password')
    username = serializer.validated_data.get('username')

    validity = authenticate(username=username,password=password)
    if validity == type(object):
        token_generated = Token(user=username)

        return Response({"Message":f"user exists and he is checked to be valid, here is your token: {token_generated}"},status=status.HTTP_202_ACCEPTED)
    else:
        return Response({"Message":"You do not exist in the database, try making an account lil bro"},status=status.HTTP_404_NOT_FOUND)


