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

class CartDetailSerializer(serializers.ModelSerializer):
    cartProducts = CartProductDetailSerializer(many=True, read_only=True)
    class Meta:
        model = Cart
        fields = ['id', 'quantity', 'totalPrice', 'cartProducts']