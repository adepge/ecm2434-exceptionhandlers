from django.urls import path
from .views import *
from user_authentication.views import * 
from django.conf.urls.static import static
from django.conf import settings



urlpatterns = [
    #USER AUTHENTICATION API ENDPOINT
    path('register/', UserRegisterAuthentication, name="register"),
    path('login/',UserLoginAuthentication, name='log'),
    #-----
    #POSTS API ENDPOINT
    path('posts/', PostsList.as_view(), name='posts-list'),
    path('posts/<int:pk>/', PostsDetail.as_view(), name='posts-detail'),
    path('geolocations/', GeolocationList.as_view(), name='geolocation-list'),
    path('geolocations/<int:pk>/', GeolocationDetail.as_view(), name='geolocation-detail'),
    #----

    # STICKER API ENDPOINT
    path('stickers/', StickersList.as_view(), name='sticker-list'),
    path('stickers/<int:pk>/', StickersDetail.as_view(), name='sticker-detail'),
    path('stickerusers/', StickersUserList.as_view(), name='stickeruser-list'),
    path('stickerusers/<int:pk>/', StickersUserDetail.as_view(), name='stickeruser-detail'),
    #---

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


