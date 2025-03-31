from rest_framework import viewsets, permissions
from .models import Event
from .serializers import EventSerializer

# Custom permission to check if the user is the event maker or an admin
class IsEventMakerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow read-only access to all users
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Allow only the event maker or admin to perform write operations
        return obj.created_by == request.user or request.user.is_staff

# Only authenticated event planners can create events
class IsEventPlanner(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'event_planner'

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.IsAuthenticated(), IsEventPlanner()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsEventMakerOrAdmin()]
        elif self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


# a class that combines logic for handling multiple HTTP methods (like GET, POST, PUT, DELETE) into a
#  single class. It is a higher-level abstraction that simplifies the creation of RESTful APIs by 
#  grouping related views together.

