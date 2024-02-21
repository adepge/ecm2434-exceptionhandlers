from django.contrib import admin

# Register your models here.
from .models import Geolocation, Posts, Stickers, StickersUser

admin.site.register(Geolocation)
admin.site.register(Posts)
admin.site.register(Stickers)
admin.site.register(StickersUser)