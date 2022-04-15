from rest_framework import serializers
from .models import *

class ClothesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Clothes
        fields = ['id', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season']

class KidClothesSerializer(serializers.ModelSerializer):

    class Meta:
        model = KidClothes
        fields = ['id', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season', 'gender', 'recommendedAge']

class MaleClothesSerializer(serializers.ModelSerializer):

    class Meta:
        model = MaleClothes
        fields = ['id', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season', 'tallFit']

class MalePantSerializer(serializers.ModelSerializer):

    class Meta:
        model = MalePant
        fields = ['id', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season', 'tallFit', 'length']

class MaleShirtSerializer(serializers.ModelSerializer):

    class Meta:
        model = MaleShirt
        fields = ['id', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season', 'tallFit', 'sleeveLength']

class FemaleClothesSerializer(serializers.ModelSerializer):

    class Meta:
        model = FemaleClothes
        fields = ['id', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season', 'petite', 'occasion']

class FemalePantSerializer(serializers.ModelSerializer):

    class Meta:
        model = FemalePant
        fields = ['id', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season', 'petite', 'occasion', 'bottomsLength', 'waistHeight']

class DressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dress
        fields = ['id', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season', 'petite', 'occasion', 'length', 'style']

class FemaleShirtSerializer(serializers.ModelSerializer):

    class Meta:
        model = FemaleShirt
        fields = ['id', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season', 'petite', 'occasion', 'neckline', 'croppedTop', 'topLength', 'sleeveLength']




