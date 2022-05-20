from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


# Create your views here.

class ClothesItemListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        listClothesItem = ClothesItem.objects.all()
        serializer = ClothesItemListSerializer(listClothesItem, many=True)
        return Response(serializer.data)


class ClothesItemAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        clothesItem = ClothesItem.objects.get(pk=pk)
        serializer = ClothesItemSerializer(clothesItem)
        return Response(serializer.data)


class AddCartView(APIView):

    def patch(self, request, pk, id):
        Item = ClothesItem.objects.get(pk=id)
        Item.cart_id = pk
        Item.save()
        serializer = ClothesItemSerializer(Item)
        return Response(serializer.data)


class DeleteCartView(APIView):

    def patch(self, request, pk, id):
        Item = ClothesItem.objects.get(pk=id)
        Item.cart_id = None
        Item.save()
        serializer = ClothesItemSerializer(Item)
        return Response(serializer.data)


class TypesListView(APIView):
    def get(self, request):
        types = Types.objects.all()
        serializer = TypesSerializer(types, many=True)
        return Response(serializer.data)
