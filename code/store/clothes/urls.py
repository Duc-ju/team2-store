from django.urls import path
from .views import *
urlpatterns = [
    path('clothes_items/', ClothesItemListAPIView.as_view()),
    path('add_cart/<int:pk>/clothes_items/<int:id>/', AddCartView.as_view()),
    path('types/', TypesListView.as_view()),
]