from django.urls import path
from .views import UserDetailAPIView, UserAPIView, AddressDetailAPIView, AddressListAPIView

urlpatterns = [
    path('<int:pk>/', UserDetailAPIView.as_view()),
    path('', UserAPIView.as_view()),
    path('addresses/<int:pk>/', AddressDetailAPIView.as_view()),
    path('<int:pk>/addresses/', AddressListAPIView.as_view()),
]
