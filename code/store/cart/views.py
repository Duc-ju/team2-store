from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from product.models import ProductItem
from .models import Cart, CartProduct
from rest_framework import status
# Create your views here.
class CartProductListAPIView(APIView):
    def post(self, request, pk):
        cart = Cart.objects.get(pk=pk)
        data = request.data
        quantity = data['quantity']
        product_item = ProductItem.objects.get(pk=data['productItem'])
        cartProducts = CartProduct.objects.filter(cart_id=pk)
        for item in cartProducts:
            if item.productItem_id == product_item.id:
                item.quantity = item.quantity + quantity
                item.save()
                cart.quantity = cart.quantity + quantity
                cart.totalPrice = cart.totalPrice + (product_item.prices*(1-product_item.discount))*quantity
                cart.save()
                serializer = CartProductDetailSerializer(item)
                return Response(serializer.data)
        cartproduct = CartProduct(cart=cart, productItem=product_item, quantity=quantity)
        cartproduct.save()
        cart.quantity = cart.quantity + quantity
        cart.totalPrice = cart.totalPrice + (product_item.prices * (1 - product_item.discount)) * quantity
        cart.save()
        serializer = CartProductDetailSerializer(cartproduct)
        return Response(serializer.data)

class CartProductDetailAPIView(APIView):

    def patch(self, request, cart_product_id):
        data = request.data
        quantity = data['quantity']
        cartProduct = CartProduct.objects.get(pk=cart_product_id)
        cartProduct.quantity = quantity
        cartProduct.save()
        serializer = CartProductDetailSerializer(cartProduct)
        return Response(serializer.data)

    def delete(self, request, cart_product_id):
        cartProduct = CartProduct.objects.get(pk=cart_product_id)
        cartProduct.delete()
        return Response(status=status.HTTP_200_OK)

    def get(self, request, cart_id, cart_product_id):
        cartProduct = CartProduct.objects.get(pk=cart_product_id)
        serializer = CartProductDetailSerializer(cartProduct)
        return Response(serializer.data)


class CartDetailAPIView(APIView):
    def get(self, request, pk):
        cart = Cart.objects.get(pk=pk)
        serializer = CartDetailSerializer(cart)
        return Response(serializer.data)

class CartListAPIView(APIView):
    def get(self, request, pk):
        cart = Cart.objects.get(user_id=pk)
        serializer = CartDetailSerializer(cart)
        return Response(serializer.data)