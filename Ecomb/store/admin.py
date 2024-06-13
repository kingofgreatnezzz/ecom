from django.contrib import admin
from .models import Products, OrderItem, Order, ShippingAddress

admin.site.register(Products)

class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'user', 'total_price', 'is_paid', 'created_at')
    search_fields = ('order_id',)

admin.site.register(Order, OrderAdmin)

admin.site.register(ShippingAddress)
