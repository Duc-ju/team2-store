from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


# Create your views here.

class BookItemListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        listBookItem = BookItem.objects.all()
        serializer = BookItemListSerializer(listBookItem, many=True)
        return Response(serializer.data)


class BookItemAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        bookItem = BookItem.objects.get(pk=pk)
        serializer = BookItemSerializer(bookItem)
        return Response(serializer.data)


class AddCartView(APIView):

    def patch(self, request, pk, id):
        bookItem = BookItem.objects.get(pk=id)
        bookItem.cart_id = pk
        bookItem.save()
        serializer = BookItemSerializer(bookItem)
        return Response(serializer.data)


class DeleteCartView(APIView):

    def patch(self, request, pk, id):
        bookItem = BookItem.objects.get(pk=id)
        bookItem.cart_id = None
        bookItem.save()
        serializer = BookItemSerializer(bookItem)
        return Response(serializer.data)


class PublisherListView(APIView):
    def get(self, request):
        publishers = Publisher.objects.all()
        serializer = PublisherSerializer(publishers, many=True)
        return Response(serializer.data)
