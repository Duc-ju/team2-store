from django.urls import path
from .views import *
urlpatterns = [
    path('book_items/', BookItemListAPIView.as_view()),
    path('add_cart/<int:pk>/book_items/<int:id>/', AddCartView.as_view()),
    path('publishers/', PublisherListView.as_view()),
]