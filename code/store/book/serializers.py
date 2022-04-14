from rest_framework import serializers
from .models import Book, Author, Category, Publisher

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
        fields = ['id', 'ISBN', 'barcode', 'language', 'publicationDate', 'numberOfPage', 'author',
                  'category', 'publisher']


