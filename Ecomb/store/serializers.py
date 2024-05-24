from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Products
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        if user is not None:
            refresh = self.get_token(user)  # Get the refresh token
            access = refresh.access_token  # Get the access token from the refresh token
            data['tokens'] = {
                'refresh': str(refresh),  # Convert refresh token to string
                'access': str(access)  # Convert access token to string
            }
            data['user'] = user  # Include the user object in the validated data
        return data




class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = User 
        fields = ['id', 'username', 'email', 'token','is_admin']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'

