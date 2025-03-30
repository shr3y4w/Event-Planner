from rest_framework.routers import DefaultRouter
from .views import EventViewSet
from django.urls import path, include

router = DefaultRouter() #This setup eliminates the need to manually define URL patterns for each action (list, create, retrieve, update, delete).
router.register(r'events', EventViewSet, basename='event')

urlpatterns = [
    path('', include(router.urls)),
]

