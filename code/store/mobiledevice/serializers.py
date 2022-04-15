from rest_framework import serializers
from .models import *

class MobileDeviceSerializer(serializers.ModelSerializer):

    class Meta:
        model = MobileDevice
        fields = ['id', 'batteryCapacity', 'warrantyDuration', 'warrantyType', 'screenSize', 'plusSize', 'brand']

class LaptopSerializer(serializers.ModelSerializer):

    class Meta:
        model = Laptop
        fields = ['id', 'batteryCapacity', 'warrantyDuration', 'warrantyType', 'screenSize', 'plusSize', 'brand', 'laptopType', 'storageType', 'weight']

class MobilePhoneSerializer(serializers.ModelSerializer):

    class Meta:
        model = MobilePhone
        fields = ['id', 'batteryCapacity', 'warrantyDuration', 'warrantyType', 'screenSize', 'plusSize', 'brand', 'ram', 'processorType', 'storageCapacity', 'mobileCableType']

class TabletSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tablet
        fields = ['id', 'batteryCapacity', 'warrantyDuration', 'warrantyType', 'screenSize', 'plusSize', 'brand', 'eReader', 'storageCapacity']
