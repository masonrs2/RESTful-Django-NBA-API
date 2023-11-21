from django.contrib import admin
from django.urls import path
from .views import SignUpView, CheckLoginView
from ninja import NinjaAPI
from .api import api
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(), name='login'),
    # ... other paths ...
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", api.urls),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('check_login/', CheckLoginView.as_view(), name='check_login'),
]
