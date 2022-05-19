from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from user.models import Customer
from rest_framework.permissions import AllowAny


# Create your views here.

class CartDetailView(APIView):

    def get(self, request, pk):
        customer = Customer.objects.get(pk=pk)
        cart = Cart.objects.filter(customer=customer, isCheckedOut=False)
        serializer = CartSerializer(cart[0])
        return Response(serializer.data)
