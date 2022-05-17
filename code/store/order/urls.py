from django.urls import path
from .views import *
urlpatterns = [
    path('customer/<int:idcustomer>/cart/<int:idcart>/orders/', AddOrder.as_view()),
    path('user/<int:id>/orders/', OrdersListViews.as_view()),
    path('order/<int:id>/', OrdersDetailViews.as_view()),
    path('orders/<int:id>/complete/', OrdersCompleteViews.as_view()),
    path('orders/<int:id>/cancel/', OrdersCancelViews.as_view()),
]