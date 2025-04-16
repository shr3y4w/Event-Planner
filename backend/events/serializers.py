from .models import Event, Booking
from rest_framework import serializers

class EventSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Event
        fields = '_all_'
        read_only_fields = ['created_by']

    def get_created_by(self, obj):
        return obj.created_by.username

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'event', 'qr_code', 'timestamp']
        read_only_fields = ['qr_code','timestamp']