from rest_framework import serializers
from django.contrib.auth.models import User 

# Converting the incoming data type into django model to save to the database, cannot save json data
class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username','password','email'] # all reveleant fields


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password']    