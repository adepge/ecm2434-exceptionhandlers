"""
URL configuration for PostCard project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from database.views import PostsList, PostsDetail, GeolocationList, GeolocationDetail, StickersList, StickersDetail, StickersUserList, StickersUserDetail


urlpatterns = [
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



