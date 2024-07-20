from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from dispatch.views import signup_view


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('store.urls')),
    path('dispatch/' ,include('dispatch.urls')),

    path('accounts/', include('django.contrib.auth.urls')), 
    path('signup/', signup_view, name='signup'),

]


urlpatterns+=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)