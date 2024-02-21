from django.contrib import admin
from .models import Geolocation, Posts, Stickers, StickersUser

class PostsAdmin(admin.ModelAdmin):
    list_display = ('postId', 'fileName', 'username', 'datetime')
    search_fields = ['fileName', 'username__username']

class GeolocationAdmin(admin.ModelAdmin):
    list_display = ('geolocID', 'location', 'position')
    # Additional customizations

class StickersAdmin(admin.ModelAdmin):
    list_display = ('stickersID', 'stickersName', 'stickersDescription', 'fileName')
    # Additional customizations

class StickersUserAdmin(admin.ModelAdmin):
    list_display = ('StickersID', 'username')
    # Additional customizations

admin.site.register(Geolocation, GeolocationAdmin)
admin.site.register(Posts, PostsAdmin)
admin.site.register(Stickers, StickersAdmin)
admin.site.register(StickersUser, StickersUserAdmin)
