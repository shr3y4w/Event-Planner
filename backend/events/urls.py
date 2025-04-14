from rest_framework.routers import DefaultRouter
from .views import EventViewSet, BookingViewSet , scan_qr
from django.urls import path, include

router = DefaultRouter() #This setup eliminates the need to manually define URL patterns for each action (list, create, retrieve, update, delete).
router.register(r'events', EventViewSet, basename='event')
router.register(r'bookings', BookingViewSet, basename='booking')

urlpatterns = [
    path('', include(router.urls)),
    path('scan/', scan_qr, name='scan-qr'),
]

