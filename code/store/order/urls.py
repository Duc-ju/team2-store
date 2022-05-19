from django.urls import path
from .views import *

urlpatterns = [
    path('customers/<int:idcustomer>/carts/<int:idcart>/orders/', AddOrder.as_view()),
    path('customers/<int:id>/orders/', OrdersListViews.as_view()),
    path('orders/<int:id>/', OrdersDetailViews.as_view()),
    path('orders/<int:id>/complete/', OrdersCompleteViews.as_view()),
    path('orders/<int:id>/cancel/', OrdersCancelViews.as_view()),
]
