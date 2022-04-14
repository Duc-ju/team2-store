from rest_framework import serializers
from .models import ProductItem, Product, Product_Img

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model= Product
        fields = ['id', 'name', 'prices', 'quantity']

class ImageProductItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product_Img
        fields = ['id', 'image']

class ProductItemDetailSerializer(serializers.ModelSerializer):
    images = ImageProductItemSerializer(many=True, read_only=True)
    product = ProductSerializer()
    class Meta:
        model = ProductItem
        fields = ['id', 'header', 'prices', 'description', 'discount', 'rate', 'product', 'images']
