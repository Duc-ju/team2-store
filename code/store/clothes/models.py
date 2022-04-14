from django.db import models
from product.models import Product
# Create your models here.
class Clothes(Product):
    material = models.CharField(max_length=255, default="")
    countryOfOrigin = models.CharField(max_length=255, default="")
    size = models.CharField(max_length=255, default="")
    pattern = models.CharField(max_length=255, default="")
    plusSize = models.BooleanField(default=False)
    brand = models.CharField(default="", max_length=255)
    season = models.CharField(max_length=255, default="")


class KidClothes(Clothes):
    gender = models.CharField(max_length=255, default="")
    recommendedAge = models.CharField(max_length=255, default="")

class MaleClothes(Clothes):
    tallfit = models.BooleanField(default=False)

class MalePant(MaleClothes):
    length = models.FloatField(default=0)

class MaleShirt(MaleClothes):
    sleeveLength = models.FloatField(default=0)

class FemaleClothes(Clothes):
    petite = models.BooleanField(default=False)
    occasion = models.CharField(default="", max_length=255)

class FemalePant(FemaleClothes):
    bottomsLength = models.FloatField(default=0)
    waistHeight = models.FloatField(default=0)

class Dress(FemaleClothes):
    length = models.FloatField(default=0)
    style = models.CharField(max_length=255, default="")

class FemaleShirt(FemaleClothes):
    neckline = models.CharField(max_length=255, default="")
    croppedTop = models.BooleanField(default=False)
    topLength = models.FloatField(default=0)
    sleeveLength = models.FloatField(default=0)

