# store/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Order

@receiver(post_save, sender=Order)
def notify_admin_on_order_delivery(sender, instance, created, **kwargs):
    if not created and instance.is_delivered:
        subject = f"Order {instance.order_id} Delivered✅"
        message = f"Order {instance.order_id} has been delivered.✅🚀 \n\n"
        message += f"User: {instance.user.username}\n"
        message += f"Email: {instance.user.email}\n"
        message += f"Delivery Address: {instance.shippingAddress.address}, {instance.shippingAddress.city}, {instance.shippingAddress.country}\n"
        message += f"Total Price: {instance.total_price}\n"
        
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [settings.ADMIN_EMAIL],  # Replace with the admin email or a list of admin emails
            fail_silently=False,
        )
