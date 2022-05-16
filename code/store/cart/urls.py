from django.urls import path
from .views import *
urlpatterns = [
    path('cart/<int:pk>/', CartDetailView.as_view()),
]