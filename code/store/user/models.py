from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class Customer(AbstractUser):
    phone = models.CharField(max_length=12, default="")
    gender = models.CharField(default="Nam", max_length=10)
    avatar = models.ImageField(upload_to='images/user_photoURLs/')
    displayName = models.CharField(max_length=30, default=0)
    midName = models.CharField(max_length=30, default=0)

class Address(models.Model):
    numberHouse = models.CharField(max_length=255, default="")
    street = models.CharField(max_length=255, default="")
    district = models.CharField(max_length=255, default="")
    city = models.CharField(max_length=255, default="")
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE)




