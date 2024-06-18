from django.urls import path
from .views import dispatch_rider_view

urlpatterns = [
     path('riders/', dispatch_rider_view, name='dispatchriders'),

    # Other URL patterns
]
