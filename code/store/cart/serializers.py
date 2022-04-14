from rest_framework import serializers
from .models import *
from product.serializers import ProductItemDetailSerializer

class CartProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartProduct
        fields = ['id', 'quantity', 'productItem']

class CartProductDetailSerializer(serializers.ModelSerializer):
    productItem = ProductItemDetailSerializer()
    class Meta:
        model = CartProduct
        fields = ['id', 'quantity', 'productItem']

