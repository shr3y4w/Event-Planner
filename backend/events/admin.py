from django.contrib import admin
from .models import Event, Booking

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title','price', 'date_time', 'location', 'available_seats', 'created_by']

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['user', 'event', 'timestamp', 'checked_in']  # ✅ Add this
    readonly_fields = ['qr_code', 'timestamp']
    list_filter = ['checked_in','event']