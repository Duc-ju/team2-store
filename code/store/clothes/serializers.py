from rest_framework import serializers
from .models import *

class ClothesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Clothes
        fields = ['id', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season']

class KidClothesSerializer(serializers.ModelSerializer):
    links = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = KidClothes
        fields = ['id','links', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season', 'gender', 'recommendedAge']

    def get_links(self, obj):
        return [
            {
                "name": "Quần áo",
                "link": "/clothes"
            },
            {
                "name": "Quần áo trẻ em",
                "link": "/kid-clothes"
            }
        ]


class MaleClothesSerializer(serializers.ModelSerializer):

    class Meta:
        model = MaleClothes
        fields = ['id', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season', 'tallfit']

class MalePantSerializer(serializers.ModelSerializer):
    links = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = MalePant
        fields = ['id', 'links', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season', 'tallfit', 'length']

    def get_links(self, obj):
        return [
            {
                "name": "Quần áo",
                "link": "/clothes"
            },
            {
                "name": "Quần áo nam",
                "link": "/male-clothes"
            },
            {
                "name": "Quần nam",
                "link": "/male-pant"
            }
        ]

class MaleShirtSerializer(serializers.ModelSerializer):
    links = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = MaleShirt
        fields = ['id', 'links', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season', 'tallfit', 'sleeveLength']

    def get_links(self, obj):
        return [
            {
                "name": "Quần áo",
                "link": "/clothes"
            },
            {
                "name": "Quần áo nam",
                "link": "/male-clothes"
            },
            {
                "name": "Áo nam",
                "link": "/male-shirt"
            }
        ]

class FemaleClothesSerializer(serializers.ModelSerializer):

    class Meta:
        model = FemaleClothes
        fields = ['id', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season', 'petite', 'occasion']

class FemalePantSerializer(serializers.ModelSerializer):
    links = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = FemalePant
        fields = ['id','links', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season', 'petite', 'occasion', 'bottomsLength', 'waistHeight']

    def get_links(self, obj):
        return [
            {
                "name": "Quần áo",
                "link": "/clothes"
            },
            {
                "name": "Quần áo nữ",
                "link": "/female-clothes"
            },
            {
                "name": "Quần nữ",
                "link": "/female-pant"
            }
        ]

class DressSerializer(serializers.ModelSerializer):
    links = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Dress
        fields = ['id', 'links', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season', 'petite', 'occasion', 'length', 'style']

    def get_links(self, obj):
        return [
            {
                "name": "Quần áo",
                "link": "/clothes"
            },
            {
                "name": "Quần áo nữ",
                "link": "/female-clothes"
            },
            {
                "name": "Váy",
                "link": "/dress"
            }
        ]

class FemaleShirtSerializer(serializers.ModelSerializer):
    links = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = FemaleShirt
        fields = ['id', 'links', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season', 'petite', 'occasion', 'neckline', 'croppedTop', 'topLength', 'sleeveLength']

    def get_links(self, obj):
        return [
            {
                "name": "Quần áo",
                "link": "/clothes"
            },
            {
                "name": "Quần áo nữ",
                "link": "/female-clothes"
            },
            {
                "name": "Áo nữ",
                "link": "/female-shirt"
            }
        ]