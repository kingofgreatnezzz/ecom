from django.db import models

import string
import random

from django.contrib.auth.models import User
# Create your models here.


class Products(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User,null=True, on_delete=models.CASCADE)
    product_name = models.CharField(max_length = 150)
    product_img = models.ImageField(blank=True,null=True)
    product_category = models.CharField(null=True, blank=True,max_length=50)
    product_info = models.TextField(null=True, blank=True)
    rating = models.DecimalField( max_digits=8, decimal_places=2, null=True, blank=True)
    price = models.DecimalField( max_digits=7, decimal_places=2, null=True, blank=True)
    stock_count = models.IntegerField(null=True, blank=True, default=0)
    createdat = models.DateField( auto_now_add=True)

    def __str__(self):
        return self.product_name
     


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    payment_method = models.CharField(max_length=100, null=False, blank=False)
    tax_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    shipping_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    order_id = models.CharField(max_length=6, unique=True, editable=False, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.order_id:
            self.order_id = self.generate_unique_order_id()
        super().save(*args, **kwargs)

    def generate_unique_order_id(self):
        characters = string.ascii_uppercase + string.digits
        while True:
            order_id = ''.join(random.choices(characters, k=6))
            if not Order.objects.filter(order_id=order_id).exists():
                break
        return order_id

    def __str__(self):
        return self.order_id if self.order_id else str(self.id)
    
class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='shippingAddress')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    address = models.CharField(max_length=200, null=False, blank=False)
    city = models.CharField(max_length=100, null=False, blank=False)
    postal_code = models.CharField(max_length=20, null=False, blank=False)
    country = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return self.address



class OrderItem(models.Model):
    product = models.ForeignKey('Products', on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=False, blank=False, default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.name
