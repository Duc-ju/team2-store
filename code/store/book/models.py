from django.db import models
from product.models import Product
# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=255)


class Publisher(models.Model):
    name = models.CharField(max_length=255)


class Author(models.Model):
    name = models.CharField(max_length=255)
    biography = models.TextField(max_length=1023)


class Book(Product):
    isbn = models.CharField(max_length=255, default="")
    barcode = models.CharField(max_length=255, default="")
    language = models.CharField(max_length=127)
    publicationDate = models.DateField()
    numberOfPages = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
