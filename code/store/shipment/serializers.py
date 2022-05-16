from rest_framework import serializers
from .models import *

class ShipmentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Shipment
        fields = ['id', 'type', 'cost', 'address', 'phone', 'createAt', 'updatedAt']
