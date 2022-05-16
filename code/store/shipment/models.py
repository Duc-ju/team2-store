from django.db import models
# Create your models here.
class Shipment(models.Model):
    type = models.CharField(max_length=255, default="")
    cost = models.FloatField(default=0)
    address = models.CharField(max_length=255, default="")
    phone = models.CharField(max_length=12, default="")
    createAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)