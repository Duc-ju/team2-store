from django.db import models

# Create your models here.
from user.models import Customer
from cart.models import Cart
from shipment.models import Shipment
from payment.models import Payment

class Order(models.Model):
    status = models.CharField(max_length=255, default="")
    createAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE)
    shipment = models.OneToOneField(Shipment, on_delete=models.SET_NULL, null=True)
    payment = models.OneToOneField(Payment, on_delete=models.SET_NULL, null=True)