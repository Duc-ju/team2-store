from rest_framework import serializers
from .models import *
from user.serializers import CustomerSerializer
from book.serializers import BookItemSerializer
from clothes.serializers import ClothesItemSerializer
from laptop.serializers import LaptopItemSerializer


class CartSerializer(serializers.ModelSerializer):
    bookItems = BookItemSerializer(many=True)
    clothesItems = ClothesItemSerializer(many=True)
    laptopItems = LaptopItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ['id', 'createAt', 'updatedAt', 'bookItems', 'clothesItems', 'laptopItems']
