from django.db import models
from product.models import Product
# Create your models here.


class MobileDevice(Product):
    batteryCapacity = models.CharField(max_length=255, default="")
    warrantyDuration = models.CharField(max_length=255, default="")
    warrantyType = models.CharField(max_length=255, default="")
    screenSize = models.CharField(max_length=255, default="")
    brand = models.CharField(max_length=255, default="")


class Laptop(MobileDevice):
    laptopType = models.CharField(max_length=255, default="")
    storageType = models.CharField(max_length=255, default="")
    weight = models.CharField(max_length=255, default="")


class MobilePhone(MobileDevice):
    processorType = models.CharField(max_length=255)
    storageCapacity = models.CharField(max_length=255)
    mobileCableType = models.CharField(max_length=255)
    ram = models.CharField(max_length=255)


class Tablet(MobileDevice):
    eReader = models.BooleanField(default=False)
    storageCapacity = models.CharField(max_length=255)