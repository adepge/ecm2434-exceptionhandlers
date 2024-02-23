from django.contrib import admin
from .models import Geolocation, Posts, Stickers, StickersUser
# Register models to admint page based on the models.py file, adding the list_display and search_fields to make it easier to search and view the data
class PostsAdmin(admin.ModelAdmin):
    list_display = ('id', 'fileName', 'username', 'datetime')
    search_fields = ['fileName', 'username__username']

class GeolocationAdmin(admin.ModelAdmin):
    list_display = ('id', 'location', 'latitude', 'longitude')
    
class StickersAdmin(admin.ModelAdmin):
    list_display = ('id', 'stickersName', 'stickersDescription', 'fileName')
    
class StickersUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username')
    
# Register to admin site
admin.site.register(Geolocation, GeolocationAdmin)
admin.site.register(Posts, PostsAdmin)
admin.site.register(Stickers, StickersAdmin)
admin.site.register(StickersUser, StickersUserAdmin)


