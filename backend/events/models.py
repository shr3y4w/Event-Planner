from django.db import models
from django.contrib.auth import get_user_model
import qrcode
import io
import base64

User = get_user_model()

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date_time = models.DateTimeField()
    location = models.CharField(max_length=255)
    available_seats = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2,default=0.0)  
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events')

    def _str_(self):
        return self.title
    
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='bookings')
    qr_code = models.TextField()  # base64 encoded string
    timestamp = models.DateTimeField(auto_now_add=True)
    checked_in = models.BooleanField(default=False)

    def _str_(self):
        return f"{self.user.username} booked {self.event.title}"