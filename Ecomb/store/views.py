from rest_framework.decorators import api_view,  permission_classes
from rest_framework.response import Response 
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Products
from django.contrib.auth.models import User


from rest_framework.permissions import IsAuthenticated
from .serializers import ProductSerializers, UserSerializers
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status

from .serializers import MyTokenObtainPairSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser



@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUsers(request):
    user = User.objects.all()
    serializer = UserSerializers(user, many=True)
    return Response(serializer.data)











class GetUserProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializers(user)
        return Response(serializer.data)



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            tokens = serializer.validated_data['tokens']

            # Serialize the user object
            user_serializer = UserSerializers(user)

            # Construct the response data
            response_data = {
                'user': user_serializer.data,  # Include the serialized user data
                'tokens': tokens  # Include the tokens
            }
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




 
@api_view(["GET"])
def getroutes(request):
    return Response('hello king of greatness',)

@api_view(["GET"])
def getproducts(request):
    products = Products.objects.all()
    serializer = ProductSerializers(products, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def getproduct(request, pk):
    product = Products.objects.get(id=pk)
    serializer = ProductSerializers(product)
    return Response(serializer.data)
