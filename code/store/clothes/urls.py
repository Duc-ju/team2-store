from django.urls import path
from .views import *

urlpatterns = [
    path('clothes_items/', ClothesItemListAPIView.as_view()),
    path('clothes_items/<int:pk>/', ClothesItemAPIView.as_view()),
    path('carts/<int:pk>/clothes_items/<int:id>/add/', AddCartView.as_view()),
    path('carts/<int:pk>/clothes_items/<int:id>/delete/', DeleteCartView.as_view()),
    path('types/', TypesListView.as_view()),
]
