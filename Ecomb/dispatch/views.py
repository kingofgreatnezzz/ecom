from datetime import datetime
from django.shortcuts import render, redirect
from .models import DeliveryStatus, DispatchRider
from store.models import Order
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login

def signup_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            # Create a DispatchRider instance for the new user
            DispatchRider.objects.create(user=user)
            login(request, user)
            return redirect('dispatchriders')
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})


@login_required
def dispatch_rider_view(request):
    try:
        dispatch_rider = request.user.dispatchrider
    except DispatchRider.DoesNotExist:
        return redirect('signup')

    if request.method == 'POST':
        order_id = request.POST.get('order_id')
        action = request.POST.get('action')
        try:
            order = Order.objects.get(order_id=order_id)
        except Order.DoesNotExist:
            return redirect('dispatchriders')

        if action == 'ongoing':
            delivery_status, created = DeliveryStatus.objects.get_or_create(
                order=order,
                defaults={'is_delivered': False, 'rider': dispatch_rider}
            )
            delivery_status.rider = dispatch_rider
            delivery_status.save()
        elif action == 'delivered':
            try:
                delivery_status = DeliveryStatus.objects.get(order=order, rider=dispatch_rider)
                delivery_status.is_delivered = True
                delivery_status.delivered_at = datetime.now()
                delivery_status.save()
                order.is_delivered = True
                order.delivered_at = datetime.now()
                order.save()
            except DeliveryStatus.DoesNotExist:
                pass

        return redirect('dispatchriders')

    undelivered_orders = Order.objects.filter(is_delivered=False).select_related('shippingAddress', 'deliverystatus__rider')
    context = {
        'undelivered_orders': undelivered_orders
    }
    return render(request, 'dispatchriders.html', context)
