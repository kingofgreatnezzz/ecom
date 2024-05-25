from django.core.mail import EmailMessage
from django.conf import settings
from django.shortcuts import render
from rest_framework.decorators import api_view,  permission_classes
from rest_framework.response import Response

from .models import Products


from .serializers import ProductSerializers, UserSerializers, UserSerializerWithToken
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework import status

from .serializers import MyTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
# users/views.py
from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text
from django.template.loader import render_to_string
from django.core.mail import send_mail
from rest_framework import status

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.urls import reverse
from .utils import account_activation_token
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password


@api_view(['POST'])
def register(request):
    data = request.data
    try:
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            password=make_password(data['password']), is_active=False
        )

        #generate token to send mail
        email_subjects = "Activate your email"
        message = render_to_string(
            "activate.html",{
                
            'user': user,
            'domain': '127.0.0.1:8000',
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': account_activation_token.make_token(user),
            }
        )
        #print(message)

        # send to  email 
        email_message = EmailMessage(email_subjects, message, settings.EMAIL_HOST_USER, [data['email']])
        email_message.send()

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)









class ActivateView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            return render(request, "activate_succes.html", {})
        else:
            return render(request, "activate_fail.html", {})
            







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
