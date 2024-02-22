from django.contrib import admin
from django.urls import path, include
from database.views import PostsList, PostsDetail, GeolocationList, GeolocationDetail, StickersList, StickersDetail, StickersUserList, StickersUserDetail
from rest_framework.routers import DefaultRouter

# Add a default router to the urlpatterns which should be the main site for the API
router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('posts/', PostsList.as_view(), name='posts-list'),
    path('posts/<int:pk>/', PostsDetail.as_view(), name='posts-detail'),
    path('geolocations/', GeolocationList.as_view(), name='geolocation-list'),
    path('geolocations/<int:pk>/', GeolocationDetail.as_view(), name='geolocation-detail'),
    
    # Sticker URLs
    path('stickers/', StickersList.as_view(), name='sticker-list'),
    path('stickers/<int:pk>/', StickersDetail.as_view(), name='sticker-detail'),

    # StickerUser URLs
    path('stickerusers/', StickersUserList.as_view(), name='stickeruser-list'),
    path('stickerusers/<int:pk>/', StickersUserDetail.as_view(), name='stickeruser-detail'),
]

