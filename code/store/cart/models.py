from django.db import models
from product.models import ProductItem
from user.models import User
# Create your models here.


class Cart(models.Model):
    quantity = models.IntegerField(default=0)
    totalPrice = models.FloatField(default=0)
    items = models.ManyToManyField(ProductItem, through='CartProduct')
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class CartProduct(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    productItem = models.ForeignKey(ProductItem, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)



