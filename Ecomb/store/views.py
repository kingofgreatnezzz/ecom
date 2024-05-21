#from django.shortcuts import render
#from django.http import JsonResponse

from rest_framework.decorators import   api_view
from .models import Products
from .serializers import ProductSerializers

from rest_framework.response import Response 
# Create your views here.

@api_view(["GET"])
def getroutes(request):
    return Response('hello king of greatness',)

#prouctlist 
@api_view(["GET"])
def getproducts(request):
    products = Products.objects.all()
    serialzer = ProductSerializers(products, many=True)
    return Response(serialzer.data)

#productdetail
@api_view(["GET"])
def getproduct(request, pk):
    products = Products.objects.get(id=pk)
    serializer = ProductSerializers(products,many=False)
    return Response(serializer.data)

