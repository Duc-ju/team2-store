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
    links = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = MobilePhone
        fields = ['id', 'links', 'batteryCapacity', 'warrantyDuration', 'warrantyType', 'screenSize', 'brand', 'ram', 'processorType', 'storageCapacity', 'mobileCableType']

    def get_links(self, obj):
        return [
            {
                "name": "Thiết bị di động",
                "link": "/mobile-device"
            },
            {
                "name": "Mobile Phone",
                "link": "/mobile-phone"
            }
        ]

class TabletSerializer(serializers.ModelSerializer):
    links = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Tablet
        fields = ['id', 'type', 'batteryCapacity', 'warrantyDuration', 'warrantyType', 'screenSize', 'plusSize', 'brand', 'eReader', 'storageCapacity']

    def get_links(self, obj):
        return [
            {
                "name": "Thiết bị di động",
                "link": "/mobile-device"
            },
            {
                "name": "Tablet",
                "link": "/tablet"
            }
        ]