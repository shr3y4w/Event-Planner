from rest_framework import viewsets, permissions
from .models import Event
from .serializers import EventSerializer

class IsEventPlanner(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'event_planner'

# we create views for:
# Creating an Event (POST)
# Viewing all Events (GET)
# Updating an Event (PUT)
# Deleting an Event (DELETE)

class EventViewSet(viewsets.ModelViewSet):  # Provides CRUD operations using Django Rest Framework's ModelViewSet
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsEventPlanner()]
        # Allow unauthenticated access to view events
        elif self.action == 'list' or self.action == 'retrieve':
            return [permissions.AllowAny()]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)



# a class that combines logic for handling multiple HTTP methods (like GET, POST, PUT, DELETE) into a
#  single class. It is a higher-level abstraction that simplifies the creation of RESTful APIs by 
#  grouping related views together.

