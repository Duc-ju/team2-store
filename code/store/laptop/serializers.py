from rest_framework import serializers
from .models import *

class ProducerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Producer
        fields = ['id', 'name']

class LaptopSerializer(serializers.ModelSerializer):
    producer = ProducerSerializer()
    class Meta:
        model = Laptop
        fields = ['id', 'name', 'price', 'laptopType', 'storageType', 'weight', 'producer']

class LaptopImgSerializer(serializers.ModelSerializer):
    class Meta:
        model = LaptopImg
        fields = ['id', 'img']

class LaptopItemSerializer(serializers.ModelSerializer):
    images = LaptopImgSerializer(many=True, read_only=True)
    laptop = LaptopSerializer()
    class Meta:
        model = LaptopItem
        fields = ['id', 'title', 'price', 'discount', 'images', 'laptop', 'cart']

