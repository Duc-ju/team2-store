from rest_framework import serializers
from .models import *

class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = ['id', 'name', 'biography']

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['id', 'name']

class PublisherSerializer(serializers.ModelSerializer):

    class Meta:
        model = Publisher
        fields = ['id', 'name']

class BookSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()
    category = CategorySerializer()
    publisher = PublisherSerializer()
    class Meta:
        model = Book
        fields = ['id', 'isbn', 'name', 'price', 'barcode', 'language', 'publicationDate', 'numberOfPages', 'author',
                  'category', 'publisher']

class BookImgSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookImg
        fields = ['id', 'img']

class BookItemSerializer(serializers.ModelSerializer):
    book = BookSerializer()
    images = BookImgSerializer(many=True, read_only=True)
    class Meta:
        model = BookItem
        fields = ['id', 'title', 'price', 'discount', 'images', 'book', 'cart']

