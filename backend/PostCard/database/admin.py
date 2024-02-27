from django.contrib import admin
from .models import Geolocation, Posts, Stickers, StickersUser, PostsUser
# Register models to admint page based on the models.py file, adding the list_display and search_fields to make it easier to search and view the data
class PostsAdmin(admin.ModelAdmin):
    list_display = ('id', 'userid', 'datetime')
    search_fields = ['username__username']

class GeolocationAdmin(admin.ModelAdmin):
    list_display = ('id', 'location', 'latitude', 'longitude')
    
class StickersAdmin(admin.ModelAdmin):
    list_display = ('id', 'stickersName', 'stickersDescription', 'fileName')
    
class StickersUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username')

class PostUserAdmin(admin.ModelAdmin):
    display = ('userID')
    
# Register to admin site
admin.site.register(Geolocation, GeolocationAdmin)
admin.site.register(Posts, PostsAdmin)
admin.site.register(Stickers, StickersAdmin)
admin.site.register(StickersUser, StickersUserAdmin)
admin.site.register(PostsUser, PostUserAdmin)


