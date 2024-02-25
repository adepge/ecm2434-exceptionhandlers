from django.db import models

# Create your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

class UserAdmin(BaseUserAdmin):
    # Customize list_display to show the desired fields
    list_display = ('id', 'username', 'email', 'first_name', 'last_name', 'is_staff')
    # You can also customize other options like list_filter, search_fields etc.

# Unregister the original User admin and register the customized version
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
