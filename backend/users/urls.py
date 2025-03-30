from django.urls import path
from .views import RegisterView, LoginView, EventManagementView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('manage-events/', EventManagementView.as_view(), name='manage-events'),
]
