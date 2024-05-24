#this is the main urls 
#import static and settings.py 

from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('store.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]


urlpatterns+=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)