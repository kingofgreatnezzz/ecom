# This is the store app urls.py

from django.urls import path
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from . import views

urlpatterns = [
    path('', views.getroutes, name='getroutes'),
    path('products/', views.getproducts, name="getproducts"),
    path('product/<str:pk>/', views.getproduct, name="getproduct"),

    path('users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('users/profile/', views.GetUserProfile.as_view(), name='get_user_profile'),
    path('users/getUsers/', views.getUsers, name="getUsers"),
    path('users/register/', views.register, name='register'),
    path('activate/<str:uidb64>/<str:token>/', views.ActivateView.as_view(), name='activate'),


    path('orders/add/', views.addOrderItems, name='orders-add'),

    path('products/search/', views.search_products, name='search-products'),

    path('notifications/', views.NotificationListView.as_view(), name='notifications'),
    path('notifications/<int:id>/', views.MarkNotificationRead.as_view(), name='mark_notification_read'),



]
