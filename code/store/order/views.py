from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Voucher
from .serializers import VoucherListSerializer


class VoucherDetailAPIView(APIView):
    def get(self, request, pk):
        voucher = Voucher.objects.get(pk=pk)
        serializer = VoucherListSerializer(voucher)
        return Response(serializer.data)