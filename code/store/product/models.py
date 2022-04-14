from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=255, default="")
    prices = models.FloatField(default=0)
    quantity = models.IntegerField(default=0)


class ProductItem(models.Model):
    header = models.CharField(max_length=255, default="")
    prices = models.FloatField(default=0)
    description = models.TextField(default="")
    discount = models.FloatField(default=0)
    rate = models.FloatField(default=0)
    product = models.OneToOneField(Product, on_delete=models.CASCADE)

class Product_Img(models.Model):
    image = models.ImageField(upload_to="images/")
    productItem = models.ForeignKey(ProductItem, on_delete=models.CASCADE, related_name='images')

