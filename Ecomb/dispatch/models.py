# Create your models here.
from django.contrib.auth.models import User
from django.db import models
from store.models import Order  # Assuming store is your main app

class DispatchRider(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Add other relevant fields like phone number, etc.

class DeliveryStatus(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(null=True, blank=True)
    rider = models.ForeignKey(DispatchRider, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
       return f"{self.order.order_id} - {self.is_delivered}"