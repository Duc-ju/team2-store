from rest_framework import serializers
from .models import *

class ClothesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Clothes
        fields = ['id', 'material', 'countryOfOrigin', 'size', 'pattern', 'plusSize', 'brand', 'season']

class KidClothesSerializer(serializers.ModelSerializer):

    class Meta:
        model = KidClothes
        fields = ['id', 'gender', 'recommendedAge']

class MaleClothesSerializer(serializers.ModelSerializer):

    class Meta:
        model = MaleClothes
        fields = ['id', 'tallFit']

class MalePantSerializer(serializers.ModelSerializer):

    class Meta:
        model = MalePant
        fields = ['id', 'length']

class MaleShirtSerializer(serializers.ModelSerializer):

    class Meta:
        model = MaleShirt
        fields = ['id', 'sleeveLength']

class FemaleClothesSerializer(serializers.ModelSerializer):

    class Meta:
        model = FemaleClothes
        fields = ['id', 'petite', 'occasion']

class FemalePantSerializer(serializers.ModelSerializer):

    class Meta:
        model = FemalePant
        fields = ['id', 'bottomsLength', 'waistHeight']

class DressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dress
        fields = ['id', 'length', 'style']

class FemaleShirtSerializer(serializers.ModelSerializer):

    class Meta:
        model = FemaleShirt
        fields = ['id', 'neckline', 'croppedTop', 'topLength', 'sleeveLength']




