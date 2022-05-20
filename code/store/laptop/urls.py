from django.urls import path
from .views import *

urlpatterns = [
    path('laptop_items/', LaptopItemListAPIView.as_view()),
    path('laptop_items/<int:pk>/', LaptopItemAPIView.as_view()),
    path('carts/<int:pk>/laptop_items/<int:id>/add/', AddCartView.as_view()),
    path('carts/<int:pk>/laptop_items/<int:id>/delete/', DeleteCartView.as_view()),
    path('producers/', ProducersListView.as_view()),
]
