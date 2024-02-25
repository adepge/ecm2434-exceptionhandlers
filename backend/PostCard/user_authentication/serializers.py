from rest_framework import serializers
from django.contrib.auth.models import User 
from django.db import IntegrityError
from rest_framework import status
from rest_framework.response import Response


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password','email']

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with that username already exists.")
        return value