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
    password_check = request.data.get("password")
    username_check = request.data.get("username")
    special_chars = ['!','@','#','$','%','^','_','-','?','/','*','+','-','£','(','()',')','=','~','¬']  #List of special characters, add if you guys see fit

    if password_check.isdigit():
        return Response({"Password error": "invalid password, Password cannot be all ints"},status=status.HTTP_400_BAD_REQUEST)
    
    # No identical info in password
    elif username_check in password_check:
        return Response({"Password error": "invalid password, Cannot have your username in your password"},status=status.HTTP_400_BAD_REQUEST)
    
    # Seeing if the password contains a special character
    special_char_found = False
    for chars in password_check:
        if chars in special_chars:
            special_char_found = True
            break

    if special_char_found == False:
        return Response({"Password error": "invalid password, Passwor must contain a special char"},status=status.HTTP_400_BAD_REQUEST)

    # Seeing if password contains a capital letter
    char_is_upper = False
    for chars in password_check:
        if chars.isupper() == True:
            char_is_upper = True
            break

    if char_is_upper == False:
        return Response({"Password error": "invalid password, Passwor must contain a capital letter"},status=status.HTTP_400_BAD_REQUEST)


        
    
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():

        # Retrieving validateed data
        username = serializer.validated_data.get('username')
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')

        user_instance = User(username=username,email=email)
        user_instance.set_password(password) # Must use set password so django recoginzes its a password
        user_instance.save()
        token, _ = Token.objects.get_or_create(user=user_instance) # Avoids needing to login in after making page

        
        return Response({f"token": token.key},status=status.HTTP_200_OK)   # Successful user creation
    else: 
        errors = str(serializer.errors) # Shows erros for: already used username in db and an invalid email (no "@" and ending such as ".com")
        return Response({"error messages":errors},status=status.HTTP_400_BAD_REQUEST) # Failed user creation


@api_view(['POST']) # Secuirty purposes we do not want to append user details to header
@permission_classes([AllowAny]) 
def UserLoginAuthentication(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)

    if user: # checks to see if user exists in database 

        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)
    else:
        # if user does not exist
        return Response({"username": "Invalid credentials"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST']) 
@permission_classes([AllowAny])
def UserLogout(request):
    try:
        user = request.user
        user_token = Token.objects.get(user=user)

        user_token.delete() # Token for given user deleted 
    except:
        return Response({"Message": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"Message": "User logged out successful"},status=status.HTTP_200_OK)
