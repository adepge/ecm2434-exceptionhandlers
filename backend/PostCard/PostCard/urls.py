from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

import posts.urls
# Add a default router to the urlpatterns which should be the main site for the API
router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('api/',include(posts.urls)), # Contains all the API Endpoints 
    path('admin/', admin.site.urls)
]