from rest_framework import serializers
from .models import *

class MobileDeviceSerializer(serializers.ModelSerializer):

    class Meta:
        model = MobileDevice
        fields = ['id', 'batteryCapacity', 'warrantyDuration', 'warrantyType', 'screenSize', 'brand']

class LaptopSerializer(serializers.ModelSerializer):

    links = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Laptop
        fields = ['id', 'links', 'batteryCapacity', 'warrantyDuration', 'warrantyType', 'screenSize', 'brand', 'laptopType', 'storageType', 'weight']

    def get_links(self, obj):
        return [
            {
                "name": "Thiết bị di động",
                "link": "/mobile-device"
            },
            {
                "name": "Laptop",
                "link": "/laptop"
            }
        ]

class MobilePhoneSerializer(serializers.ModelSerializer):

    type = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = MobilePhone
        fields = ['id', 'type', 'batteryCapacity', 'warrantyDuration', 'warrantyType', 'screenSize', 'brand', 'ram', 'processorType', 'storageCapacity', 'mobileCableType']

    def get_type(self, obj):
        return "Mobile"

class TabletSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tablet
        fields = ['id', 'type', 'batteryCapacity', 'warrantyDuration', 'warrantyType', 'screenSize', 'plusSize', 'brand', 'eReader', 'storageCapacity']
