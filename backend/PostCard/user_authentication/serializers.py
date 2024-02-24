from rest_framework import serializers
from django.contrib.auth.models import User 
from django.db import IntegrityError
from rest_framework import status
from rest_framework.response import Response


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password','email']