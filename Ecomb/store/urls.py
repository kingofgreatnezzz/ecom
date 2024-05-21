# This is the store app urls.py

from django.urls import path
from store import views

urlpatterns = [
    path('', views.getroutes, name='getroutes'),
    path('products/', views.getproducts, name="getproducts")
]
