from rest_framework import serializers
from database.models import Geolocation, Posts, Stickers, StickersUser
from django.contrib.auth.models import User

# Add all the serializers here for the models
class GeolocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Geolocation
        fields = '__all__'  # This will include all fields from the Geolocation model

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = '__all__'  # This will include all fields from the Posts model

class StickersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stickers
        fields = '__all__'  # This will include all fields from the Stickers model

class StickersUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = StickersUser
        fields = '__all__'  # This will include all fields from the StickersUser model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'  
