from rest_framework import serializers
from .models import *
from cart.serializers import CartSerializer
from user.serializers import CustomerSerializer
from payment.serializers import PaymentSerializer
from shipment.serializers import ShipmentSerializer


class OrderSerializer(serializers.ModelSerializer):
    cart = CartSerializer()
    shipment = ShipmentSerializer()
    payment = PaymentSerializer()

    class Meta:
        model = Order
        fields = ['id', 'status', 'createAt', 'updatedAt', 'customer', 'cart', 'shipment', 'payment']
