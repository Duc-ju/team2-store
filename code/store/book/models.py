from django.db import models
from cart.models import Cart
# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=255)


class Publisher(models.Model):
    name = models.CharField(max_length=255)


class Author(models.Model):
    name = models.CharField(max_length=255)
    biography = models.TextField(max_length=1023)


class Book(models.Model):
    isbn = models.CharField(max_length=255, default="")
    name = models.CharField(max_length=255, default="")
    price = models.FloatField(default=0)
    barcode = models.CharField(max_length=255, default="")
    language = models.CharField(max_length=127)
    publicationDate = models.DateField()
    numberOfPages = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)


class BookItem(models.Model):
    title = models.CharField(max_length=255, default="")
    price = models.FloatField(default=0)
    discount = models.FloatField(default=0)
    book = models.OneToOneField(Book, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, default=None, null=True, on_delete=models.SET_NULL, blank=True, related_name='bookItems')

class BookImg(models.Model):
    bookItem = models.ForeignKey(BookItem, on_delete=models.CASCADE, related_name='images')
    img = models.ImageField(upload_to='images/book_photoURLs/')

