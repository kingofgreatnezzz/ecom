from django.core.mail import EmailMessage
from django.conf import settings
from django.shortcuts import render
from rest_framework.decorators import api_view,  permission_classes



from rest_framework_simplejwt.views import TokenObtainPairView


from rest_framework.permissions import IsAuthenticated, IsAdminUser
# users/views.py
from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text
from django.template.loader import render_to_string


from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .utils import account_activation_token
from rest_framework.decorators import api_view
from .models import *
from django.contrib.auth.hashers import make_password
import threading

from .serializers import OrderSerializer
import string
import random


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Notification
from .serializers import *


from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q


@api_view(['GET'])
def search_products(request):
    query = request.query_params.get('q', '')
    if query:
        products = Products.objects.filter(
            Q(product_name__icontains=query) | 
            Q(product_info__icontains=query) |
            Q(product_category__icontains=query)
        )
        serializer = ProductSerializers(products, many=True)
        return Response(serializer.data)
    return Response([])


@permission_classes([IsAuthenticated])
class NotificationListView(APIView):

    def get(self, request):
        user = request.user
        notifications = Notification.objects.filter(user=user).order_by('-created_at')
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class MarkNotificationRead(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, id):
        try:
            notification = Notification.objects.get(id=id, user=request.user)
            notification.is_read = True
            notification.save()
            return Response({'detail': 'Notification marked as read'}, status=status.HTTP_200_OK)
        except Notification.DoesNotExist:
            return Response({'detail': 'Notification not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_special_offer(request):
    user = request.user
    data = request.data

    Notification.objects.create(
        user=user,
        message=data['message'],
        notification_type='special_offer'
    )

    return Response({'detail': 'Special offer notification created'}, status=status.HTTP_201_CREATED)


def generate_unique_order_id():
    characters = string.ascii_uppercase + string.digits
    while True:
        order_id = ''.join(random.choices(characters, k=6))
        if not Order.objects.filter(order_id=order_id).exists():
            break
    return order_id

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data.get('orderItems')

    if not orderItems or len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)

    order_id = generate_unique_order_id()
    order = Order.objects.create(
        user=user,
        order_id=order_id,
        tax_price=data.get('tax_price', 0),
        shipping_price=data.get('shipping_price', 0),
        total_price=data.get('total_price', 0),
        ref_no = data.get('ref_no', 0),
        is_paid=True,
        paid_at=data.get('paid_at')
    )
    
    Notification.objects.create(
        user=user,
        message=f'Your order #{order_id} has been placed successfully.',
        notification_type='order_confirmation'
    )

    shipping = ShippingAddress.objects.create(
        order=order,
        user=user,
        address=data['shippingAddress']['address'],
        city=data['shippingAddress']['city'],
        postal_code=data['shippingAddress']['postalCode'],
        country=data['shippingAddress']['country'],
        email=data['shippingAddress']['email'],
        phone=data['shippingAddress']['phone'],
    )

    for item in orderItems:
        OrderItem.objects.create(
            product_id=item['product'],
            order=order,
            name=item['name'],
            qty=item['qty'],
            price=item['price'],
            image=item['image']
        )
    
      # Create DeliveryStatus entry
    DeliveryStatus.objects.create(order=order)

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


class EmailThread(threading.Thread):
    def __init__(self, email_message):
        self.email_message = email_message
        super().__init__()

    def run(self):
        self.email_message.send()


@api_view(['POST'])
def register(request):
    data = request.data
    try:
        # Create the user
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            password=make_password(data['password']),
            is_active=False  # Set to False if you want email activation
        )

        # Generate token to send mail
        email_subject = "Activate Your Account"
        message = render_to_string(
            "activate.html",
            {
                'user': user,
                'domain': '127.0.0.1:8000',
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_activation_token.make_token(user),
            }
        )

        # Send email
        email_message = EmailMessage(email_subject, message, settings.EMAIL_HOST_USER, [data['email']])
        #Email thread for sending email.
        EmailThread(email_message).start()

        response = {"details": "Successfully Signed Up. Activate your account by clicking the link sent to your email."}
        return Response(response)
    
    except Exception as e:
        # Print the error to the terminal for debugging
        print(f"Error during user registration: {str(e)}")

        response = {"details": "Username with this email already exists or something went wrong."}
        #return Response(response, status=status.HTTP_400_BAD_REQUEST)
        return Response(response)


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
