from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from .views import *

urlpatterns = [
    path('<int:pk>/cart_products/', CartProductListAPIView.as_view(), name='add_to_cart'),
    path('<int:cart_id>/cart_products/<int:cart_product_id>/', CartProductDetailAPIView.as_view(), name='update_cart'),
    path('<int:pk>/', CartDetailAPIView.as_view()),
    path('users/<int:pk>/', CartListAPIView.as_view()),
]