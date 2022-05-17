from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
# Create your views here.

class LaptopItemListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        listLaptopItem = LaptopItem.objects.filter(cart_id = None)
        serializer = LaptopItemSerializer(listLaptopItem, many=True)
        return Response(serializer.data)

class AddCartView(APIView):

    def patch(self, request, pk, id):
        Item = LaptopItem.objects.get(pk=id)
        Item.cart_id = pk
        Item.save()
        serializer = LaptopItemSerializer(Item)
        return Response(serializer.data)

class ProducersListView(APIView):
    def get(self, request):
        producers = Producer.objects.all()
        serializer = ProducerSerializer(producers, many=True)
        return Response(serializer.data)