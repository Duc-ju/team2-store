from django.db import models
from cart.models import Cart
# Create your models here.
class Producer(models.Model):
    name = models.CharField(max_length=255, default="")


class Laptop(models.Model):
    producer = models.ForeignKey(Producer, on_delete=models.SET_NULL, null=True)
    name = models.CharField(default="", max_length=255)
    price = models.FloatField(default=0)
    laptopType = models.CharField(default="", max_length=255)
    storageType = models.CharField(default="", max_length=255)
    weight = models.CharField(default="", max_length=255)


class LaptopItem(models.Model):
    laptop = models.OneToOneField(Laptop, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, default="")
    price = models.FloatField(default=0)
    discount = models.FloatField(default=0)
    cart = models.ForeignKey(Cart, default=None, null=True, on_delete=models.SET_NULL, blank=True, related_name='laptopItems')

class LaptopImg(models.Model):
    img = models.ImageField(upload_to='images/laptop_photoURLs/')
    laptopItem = models.ForeignKey(LaptopItem, on_delete=models.CASCADE, related_name='images')

