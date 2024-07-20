from django.contrib import admin
from .models import DispatchRider, DeliveryStatus, Order

class DeliveryStatusInline(admin.TabularInline):
    model = DeliveryStatus
    extra = 0

@admin.register(DispatchRider)
class DispatchRiderAdmin(admin.ModelAdmin):
    list_display = ('user', )  # Add relevant fields for display

@admin.register(DeliveryStatus)
class DeliveryStatusAdmin(admin.ModelAdmin):
    list_display = ('order', 'is_delivered', 'delivered_at', 'rider')
    list_filter = ('is_delivered', )
    search_fields = ('order__order_id', 'rider__user__username')  # Example fields to search by
    readonly_fields = ('order', 'is_delivered', 'delivered_at')  # Fields that shouldn't be edited by riders

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if not request.user.is_superuser:  # Restrict view to relevant data for non-superusers
            queryset = queryset.filter(rider__user=request.user)
        return queryset

    def save_model(self, request, obj, form, change):
        obj.rider = DispatchRider.objects.get(user=request.user)
        obj.save()

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "order":
            kwargs["queryset"] = Order.objects.filter(is_delivered=False)  # Only show undelivered orders
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
