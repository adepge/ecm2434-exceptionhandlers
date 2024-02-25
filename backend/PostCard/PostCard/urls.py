from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static


import posts.urls
# Add a default router to the urlpatterns which should be the main site for the API
router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('api/',include(posts.urls)), # Contains all the API Endpoints 
    path('admin/', admin.site.urls)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)