from django.urls import path
from .views import UserDetailAPIView, UserAPIView, AddressDetailAPIView, AddressListAPIView

urlpatterns = [
    path('users/<int:pk>/', UserDetailAPIView.as_view()),
    path('users/', UserAPIView.as_view()),
    path('addresses/<int:pk>/', AddressDetailAPIView.as_view()),
    path('users/<int:pk>/addresses/', AddressListAPIView.as_view()),
    # path('users/<int:pk>/orders/', AddressListAPIView.as_view()),
]
