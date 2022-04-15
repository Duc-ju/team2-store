from django.db import models
from product.models import ProductItem
from user.models import User, Address
# Create your models here.

class Order(models.Model):
    totalAmount = models.FloatField(default=0)
    status = models.CharField(max_length=255, default="")
    timeCreate = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    items = models.ManyToManyField(ProductItem, through='OrderProduct')

class Voucher(models.Model):
    code = models.CharField(max_length=255, default="")
    discountPercent = models.FloatField(default=0)
    description = models.TextField(default="")
    order = models.OneToOneField(Order, null=True, blank=True, on_delete=models.SET_NULL)
    def __str__(self):
        return self.code

class Shipment(models.Model):
    type = models.CharField(max_length=255, default=0)
    cost = models.FloatField(default=0)
    order = models.OneToOneField(Order, on_delete=models.SET_NULL, null=True)
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)

class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    productItem = models.ForeignKey(ProductItem, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=0)
    prices = models.FloatField(default=0)
    discount = models.FloatField(default=0)

class Feedback(models.Model):
    comment = models.CharField(default="", max_length=255)
    rate = models.FloatField(default=0)
    orderProduct = models.OneToOneField(OrderProduct, on_delete=models.SET_NULL, null=True)

class Payment(models.Model):
    totalAmount = models.FloatField(default=0)
    order = models.OneToOneField(Order, on_delete=models.SET_NULL, null=True)

class Credit(Payment):
    exDate = models.DateTimeField(null=True, blank=True)
    number = models.CharField(max_length=255, default="")

class Tranfer(Payment):
    number = models.CharField(max_length=255, default="")
    bankID = models.CharField(max_length=255, default="")

class Cash(Payment):
    pass