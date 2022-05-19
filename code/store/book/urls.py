from django.urls import path
from .views import *

urlpatterns = [
    path('book_items/', BookItemListAPIView.as_view()),
    path('carts/<int:pk>/book_items/<int:id>/add/', AddCartView.as_view()),
    path('carts/<int:pk>/book_items/<int:id>/delete/', DeleteCartView.as_view()),
    path('publishers/', PublisherListView.as_view()),
]
