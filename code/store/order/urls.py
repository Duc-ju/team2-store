from django.urls import path, include
from .views import *

urlpatterns = [
    path('vouchers/<int:pk>', VoucherDetailAPIView.as_view(), name='voucher'),
]