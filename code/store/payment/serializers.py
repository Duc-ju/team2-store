from rest_framework import serializers
from .models import *
from cart.serializers import CartSerializer
from shipment.serializers import ShipmentSerializer


class PaymentSerializer(serializers.ModelSerializer):
    shipment = ShipmentSerializer()

    class Meta:
        model = Payment
        fields = ['id', 'shipment', 'totalAmount', 'createAt', 'updatedAt']


class PayCashSerializer(serializers.ModelSerializer):
    shipment = ShipmentSerializer()

    class Meta:
        model = PayCash
        fields = ['id', 'shipment', 'totalAmount', 'createAt', 'updatedAt', 'signature', 'img']


class PayPalSerializer(serializers.ModelSerializer):
    shipment = ShipmentSerializer()

    class Meta:
        model = PayPal
        fields = ['id', 'shipment', 'totalAmount', 'createAt', 'updatedAt', 'number', 'bank', 'content']
