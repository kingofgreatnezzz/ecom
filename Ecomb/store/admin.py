from django.contrib import admin
from .models import Order, OrderItem, ShippingAddress

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0  # To hide extra blank rows

    # Customize fields to display in the inline
    fields = ('product', 'name', 'qty', 'price', 'image')

    # Optionally, you can make fields read-only
    readonly_fields = ('name', 'qty', 'price', 'image')
    # Disable editing existing items (just view)
    can_delete = False

    # Override queryset to include related products
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related('product')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'user', 'total_price', 'is_paid','ref_no', 'created_at')
    search_fields = ('order_id', 'user__username')  # Search by user's username

    # Define inline models
    inlines = [
        OrderItemInline,
    ]

@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ('order', 'user', 'address', 'city', 'email', 'phone')
    search_fields = ('email', 'city', 'order', 'phone')

    def user(self, obj):
        return obj.user.username if obj.user else None

    user.admin_order_field = 'user__username'  # Allow sorting by user's username
