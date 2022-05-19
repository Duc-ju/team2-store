from django.urls import path
from .views import *

urlpatterns = [
    path('users/<int:pk>/carts/get/', CartDetailView.as_view()),
]
