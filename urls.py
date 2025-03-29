from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from users.views import LoginView
from django.views.decorators.csrf import csrf_exempt

from rest_framework_simplejwt.views import (
        TokenObtainPairView,
        TokenRefreshView,
    )
    
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/music/', include('music.urls')),
    path('api/users/', include('users.urls')),
    path("api/login/", csrf_exempt(LoginView.as_view()), name="login"),
    
    # reset token
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 