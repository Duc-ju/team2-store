from rest_framework import serializers
from .models import *
from cart.serializers import CartSerializer
from shipment.serializers import ShipmentSerializer


class PaymentSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = ['id', 'shipment', 'totalAmount', 'type', 'createAt', 'updatedAt']

    def get_type(self, obj):
        try:
            cash = PayCash.objects.get(pk=object.id)
            return 'cash'
        except:
            return 'paypal'


class PayCashSerializer(serializers.ModelSerializer):
    class Meta:
        model = PayCash
        fields = ['id', 'shipment', 'totalAmount', 'createAt', 'updatedAt', 'signature', 'img']


class PayPalSerializer(serializers.ModelSerializer):
    class Meta:
        model = PayPal
        fields = ['id', 'shipment', 'totalAmount', 'createAt', 'updatedAt', 'number', 'bank', 'content']
