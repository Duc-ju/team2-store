from rest_framework import serializers
from .models import *


class TypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Types
        fields = ['id', 'name']


class ClothesSerializer(serializers.ModelSerializer):
    type = TypesSerializer()

    class Meta:
        model = Clothes
        fields = ['id', 'name', 'price', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand',
                  'season', 'type']


class ClothesImgSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClothesImg
        fields = ['id', 'img']


class ClothesItemListSerializer(serializers.ModelSerializer):
    images = ClothesImgSerializer(many=True, read_only=True)
    type = serializers.SerializerMethodField()

    class Meta:
        model = ClothesItem
        fields = ['id', 'title', 'price', 'discount', 'images', 'clothes', 'cart', 'type']

    def get_type(self, obj):
        return 'clothes'


class ClothesItemSerializer(serializers.ModelSerializer):
    images = ClothesImgSerializer(many=True, read_only=True)
    clothes = ClothesSerializer()
    type = serializers.SerializerMethodField()

    class Meta:
        model = ClothesItem
        fields = ['id', 'title', 'price', 'discount', 'images', 'clothes', 'cart', 'type']

    def get_type(self, obj):
        return 'clothes'
