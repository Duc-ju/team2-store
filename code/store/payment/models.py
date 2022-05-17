from django.db import models
from cart.models import Cart
from shipment.models import Shipment
# Create your models here.
class Payment(models.Model):
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE)
    shipment = models.OneToOneField(Shipment, on_delete=models.CASCADE)
    totalAmount = models.FloatField(default=0)
    createAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)

class PayCash(Payment):
    signature = models.CharField(default="", max_length=25)
    img = models.ImageField(upload_to='images/cash_photoURLs/')

class PayPal(Payment):
    number = models.CharField(max_length=255, default="")
    bank = models.CharField(max_length=255, default="")
    content = models.CharField(max_length=255, default="")
