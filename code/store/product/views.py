from django.shortcuts import render
from rest_framework.views import APIView
from .models import ProductItem
from .serializers import *
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
# Create your views here.

class ProductItemListAPIView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        listProductItem = ProductItem.objects.all()
        serializer = ProductItemDetailSerializer(listProductItem, many=True)
        return Response(serializer.data)


class ProductItemDetailAPIView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk):
        productItem = ProductItem.objects.get(pk=pk)
        serializer = ProductItemDetailSerializer(productItem)
        return Response(serializer.data)
