from django.urls import path
from .views import RegisterView, LoginView, RestrictedView, OpenView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('restricted/', RestrictedView.as_view(), name='restricted'),
    path('open/', OpenView.as_view(), name='open'),
]
