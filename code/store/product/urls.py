from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from .views import *

urlpatterns = [
    path('product_items/', ProductItemListAPIView.as_view(), name='items'),
    path('product_items/<int:pk>/', ProductItemDetailAPIView.as_view(), name='product_item'),
]