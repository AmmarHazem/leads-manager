from django.urls import path, include
from knox import views as knox_views
from . import api

app_name = 'accounts'

urlpatterns = [
    path('auth/register/', api.RegisterAPI.as_view(), name = 'register'),
    path('auth/login/', api.LoginAPI.as_view(), name = 'login'),
    path('auth/user/', api.UserAPI.as_view(), name = 'user'),
    path('auth/logout/', knox_views.LogoutView.as_view(), name = 'logout'),
    path('auth/', include('knox.urls')),
]
