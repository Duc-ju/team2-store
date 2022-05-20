from rest_framework import serializers
from .models import *
from cart.models import Cart


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'numberHouse', 'street', 'district', 'city']


class CustomerSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = Customer
        fields = ['id', 'username', 'phone', 'email', 'gender', 'avatar', 'displayName', 'midName', 'address']


class CustomerCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = Customer.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            displayName=validated_data['displayName'],
            email=validated_data['email']
        )
        Cart.objects.create(customer_id=user.id)
        return user

    class Meta:
        model = Customer
        fields = ['id', 'username', 'password', 'email', 'displayName']
