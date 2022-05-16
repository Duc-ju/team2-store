from django.urls import path
from .views import *
urlpatterns = [
    path('laptop_items/', LaptopItemListAPIView.as_view()),
    path('add_cart/<int:pk>/laptop_items/<int:id>/', AddCartView.as_view()),
    path('producers/', ProducersListView.as_view()),
]