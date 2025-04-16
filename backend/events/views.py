from rest_framework import viewsets, permissions 
from rest_framework.decorators import api_view, permission_classes
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from .models import Event , Booking
from .serializers import EventSerializer , BookingSerializer
import qrcode ,io , base64 

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

    def get_queryset(self):
        queryset = Event.objects.all()

    # Check for ?created_by=username
        username = self.request.query_params.get('created_by')
        if username:
            queryset = queryset.filter(created_by__username=username)
        elif self.action == 'list' and self.request.query_params.get('mine') == 'true':
            queryset = queryset.filter(created_by=self.request.user)

        return queryset

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):

        if self.request.user.role == 'event_planner':
            raise serializers.ValidationError("Organizers are not allowed to book events.")
    
        event = serializer.validated_data['event']

        if event.available_seats <= 0:
            raise serializers.ValidationError("No seats available for this event.")

        event.available_seats -= 1
        event.save()

        # Generate QR code
        qr_content = f"{self.request.user.username}-{event.id}-{event.title}"
        qr_img = qrcode.make(qr_content)
        buffer = io.BytesIO()
        qr_img.save(buffer, format='PNG')
        qr_base64 = base64.b64encode(buffer.getvalue()).decode()

        serializer.save(user=self.request.user, qr_code=qr_base64)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])

def scan_qr(request):
    qr_data = request.data.get('qr_data')
    if not qr_data:
        return Response({"error": "QR data not provided"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        booking = Booking.objects.get(qr_code=qr_data)

        if booking.checked_in:
            return Response({
                "status": "already_used",
                "message": "Ticket has already been used."
            }, status=status.HTTP_200_OK)

        # Mark as checked-in
        booking.checked_in = True
        booking.save()

        return Response({
            "status": "valid",
            "message": f"Welcome, {booking.user.username}!",
            "event": booking.event.title
        }, status=status.HTTP_200_OK)

    except Booking.DoesNotExist:
        return Response({
            "status": "invalid",
            "message": "Invalid QR code."
        }, status=status.HTTP_404_NOT_FOUND)

# a class that combines logic for handling multiple HTTP methods (like GET, POST, PUT, DELETE) into a
#  single class. It is a higher-level abstraction that simplifies the creation of RESTful APIs by 
#  grouping related views together.
