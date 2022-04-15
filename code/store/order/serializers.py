from rest_framework import serializers
from .models import *

class VoucherListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voucher
        fields = ["code", "discountPercent", "description"]

class VoucherDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voucher
        fields = ["id", "code", "discountPercent", "description", "order"]

class OrderListSerializers(serializers.ModelSerializer):
    pass

class OrderDetailSerializers(serializers.ModelSerializer):
    pass