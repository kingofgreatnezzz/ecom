# This is the store app urls.py

from django.urls import path
from .views import GetUserProfile
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenObtainPairView
from . import views

urlpatterns = [
    path('', views.getroutes, name='getroutes'),
    path('products/', views.getproducts, name="getproducts"),
    path('product/<str:pk>/', views.getproduct, name="getproduct"),
    path('users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', views.GetUserProfile.as_view(), name='get_user_profile'),
    path('users/getUsers/', views.getUsers, name="getUsers")
]


    #path('users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
