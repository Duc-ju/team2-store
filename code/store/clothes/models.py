from django.db import models
from cart.models import Cart
# Create your models here.

class Types(models.Model):
    name = models.CharField(max_length=255, default="")


class Clothes(models.Model):
    name = models.CharField(max_length=255,default="")
    price = models.FloatField(default=0)
    material = models.CharField(max_length=255, default="")
    countryOfOrigin = models.CharField(max_length=255, default="")
    size = models.CharField(max_length=255, default="")
    pattern = models.CharField(max_length=255, default="")
    plusSize = models.BooleanField(default=False)
    brand = models.CharField(default="", max_length=255)
    season = models.CharField(max_length=255, default="")
    type = models.ForeignKey(Types, on_delete=models.SET_NULL, null=True)


class ClothesItem(models.Model):
    title = models.CharField(max_length=255, default="")
    price = models.FloatField(default=0)
    discount = models.FloatField(default=0)
    clothes = models.OneToOneField(Clothes, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, default=None, null=True, on_delete=models.SET_NULL, blank=True, related_name='clothesItems')

class ClothesImg(models.Model):
    clothesItem = models.ForeignKey(ClothesItem, on_delete=models.CASCADE, related_name='images')
    img = models.ImageField(upload_to='images/clothes_photoURLs/')
