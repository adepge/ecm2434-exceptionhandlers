from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

# inherting the usercreationform because it provides built in authentication
class UserRegisteration(UserCreationForm):
    email = forms.EmailField()
    class Meta:
        model = User
        fields = ['username' , 'email' , 'password'] 
        