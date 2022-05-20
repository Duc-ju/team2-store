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


class LaptopItemListSerializer(serializers.ModelSerializer):
    images = LaptopImgSerializer(many=True, read_only=True)
    type = serializers.SerializerMethodField()

    class Meta:
        model = LaptopItem
        fields = ['id', 'title', 'price', 'discount', 'images', 'laptop', 'cart', 'type']

    def get_type(self, obj):
        return 'laptop'


class LaptopItemSerializer(serializers.ModelSerializer):
    images = LaptopImgSerializer(many=True, read_only=True)
    laptop = LaptopSerializer()
    type = serializers.SerializerMethodField()

    class Meta:
        model = LaptopItem
        fields = ['id', 'title', 'price', 'discount', 'images', 'laptop', 'cart', 'type']

    def get_type(self, obj):
        return 'laptop'
