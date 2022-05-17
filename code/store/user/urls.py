from django.urls import path
from .views import UserAPIView, UpdateProfile

urlpatterns = [
    path('users/', UserAPIView.as_view()),
    path('users/<int:id>/profile/', UpdateProfile.as_view()),
]