from django.shortcuts import render, redirect
from .forms import UserRegisteration
from django.contrib import messages

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegisterSerializer

@api_view(['POST']) # We only want to recieve POST requests here, GET REQUESTS ARE INVALID!
def UserRegisterAuthentication(request):
    
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save() # Account is made and save to the database, test by checking the admin page / querying to DB
        return Response(status=status.HTTP_201_CREATED)    # Successful user creation
    if not serializer.is_valid: 
        return Response(status=status.HTTP_400_BAD_REQUEST) # Failed user creation
    


