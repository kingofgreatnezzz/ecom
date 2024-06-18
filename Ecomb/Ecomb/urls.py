#this is the main urls 
#import static and settings.py 

from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

from dispatch.views import signup_view


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('store.urls')),
    path('dispatch/' ,include('dispatch.urls')),


    path('accounts/', include('django.contrib.auth.urls')), 
    path('signup/', signup_view, name='signup'),

    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]


urlpatterns+=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)