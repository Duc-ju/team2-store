from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from shipment.models import Shipment
from payment.models import Payment, PayCash, PayPal
from .models import Order
from cart.models import Cart
from book.models import BookItem
from clothes.models import ClothesItem
from laptop.models import LaptopItem
# Create your views here.

class AddOrder(APIView):

    def post(self, request, idcustomer, idcart):
        data = request.data
        shipmentData = data['shipment']
        shipment = Shipment.objects.create(type=shipmentData['type'], cost=shipmentData['cost'], address=shipmentData['address'],
        phone=shipmentData['phone'])
        try:
            paycashData = data['paycash']
            signature = paycashData['signature']
            img = paycashData['img']
            totalAmount = paycashData['totalAmount']
            paycash = PayCash.objects.create(totalAmount=totalAmount,
                                             cart_id=idcart, shipment_id=shipment.pk,
                                             signature = signature, img = img)
            order = Order.objects.create(customer_id = idcustomer, shipment_id = shipment.pk,
                                         payment_id = paycash.pk, cart_id = idcart, status = "process",
                                         )
            cart = Cart.objects.get(pk = idcart)
            cart.isCheckedOut = True
            cart.save()
            Cart.objects.create(customer_id=idcustomer)
            serializer = OrderSerializer(order)
            return Response(serializer.data)
        except:
            paypalData = data['paypal']
            number = paypalData['number']
            bank = paypalData['bank']
            content = paypalData['content']
            totalAmount = paypalData['totalAmount']
            paypal = PayPal.objects.create(totalAmount=totalAmount,
                                             cart_id=idcart, shipment_id=shipment.pk,
                                             number = number, bank = bank, content = content)
            order = Order.objects.create(customer_id=idcustomer, shipment_id=shipment.pk,
                                         payment_id=paypal.pk, cart_id=idcart, status="process",
                                         )
            cart = Cart.objects.get(pk=idcart)
            cart.isCheckedOut = True
            cart.save()
            Cart.objects.create(customer_id=idcustomer)
            serializer = OrderSerializer(order)
            return Response(serializer.data)

class OrdersListViews(APIView):

    def get(self, request, id):
        orders = Order.objects.filter(customer_id=id)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

class OrdersDetailViews(APIView):

    def get(self, request, id):
        order = Order.objects.get(pk=id)
        serializer = OrderSerializer(order)
        return Response(serializer.data)

class OrdersCompleteViews(APIView):

    def patch(self, request, id):
        order = Order.objects.get(pk=id)
        order.status = "complete"
        order.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data)

class OrdersCancelViews(APIView):

    def patch(self, request, id):
        order = Order.objects.get(pk=id)
        order.status = "cancel"
        cartId = order.cart
        bookItems = BookItem.objects.filter(cart_id = cartId)
        clothesItems = ClothesItem.objects.filter(cart_id = cartId)
        laptopItems = LaptopItem.objects.filter(cart_id = cartId)
        for Item in bookItems:
            Item.cart = None
            Item.save()
        for Item in clothesItems:
            Item.cart = None
            Item.save()
        for Item in laptopItems:
            Item.cart = None
            Item.save()
        order.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data)