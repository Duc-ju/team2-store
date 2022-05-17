from django.db import models
from user.models import Customer
# Create your models here.
class Cart(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    createAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)
    isCheckedOut = models.BooleanField(default=False)