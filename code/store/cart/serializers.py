from rest_framework import serializers
from .models import *
from user.serializers import CustomerSerializer
from book.serializers import BookItemSerializer
from clothes.serializers import ClothesItemSerializer
from laptop.serializers import LaptopItemSerializer
class CartSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer()
    bookItems = BookItemSerializer(many=True, read_only=True)
    clothesItems = ClothesItemSerializer(many=True, read_only=True)
    laptopItems = LaptopItemSerializer(many=True, read_only=True)
    class Meta:
        model = Cart
        fields = ['id', 'customer', 'createAt', 'updatedAt', 'bookItems', 'clothesItems', 'laptopItems']