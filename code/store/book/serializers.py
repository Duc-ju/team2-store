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
    links = serializers.SerializerMethodField(read_only=True)
    author = AuthorSerializer()
    category = CategorySerializer()
    publisher = PublisherSerializer()
    class Meta:
        model = Book
        fields = ['id','links', 'isbn', 'barcode', 'language', 'publicationDate', 'numberOfPages', 'author',
                  'category', 'publisher']

    def get_links(self, obj):
        return [
            {
                "name": "Sách",
                "link": "/book"
            },
        ]
