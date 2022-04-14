from itertools import chain

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework.generics import CreateAPIView

class UserDetailAPIView(APIView):

    def get(self, request, pk):
        is_staff = request.user.is_staff
        id = request.user.id
        if not is_staff and id!=pk:
            return Response({
                'status': '400',
                'message': 'Not has permission'
            })
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({
                'status': 404,
                'message': 'User not found'
            })
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def patch(self, request, pk):
        user = User.objects.get(pk = pk)
        data = request.data
        user.displayName = data['displayName']
        user.email = data['email']
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UserAPIView(CreateAPIView):
    permission_classes = [AllowAny]
    model = User
    serializer_class = UserCreateSerializer

class AddressDetailAPIView(APIView):
    def get(self, request, pk):
        address = Address.objects.get(pk=pk)
        serializer = AddressSerializer(address)
        return Response(serializer.data)

    def patch(self, request, pk):
        data = request.data
        fullName = data['fullName']
        phoneNumber = data['phoneNumber']
        city = data['city']
        district = data['district']
        detail = data['detail']
        address = Address.objects.get(pk=pk)
        address.fullName = fullName
        address.phoneNumber = phoneNumber
        address.city = city
        address.district = district
        address.detail = detail
        address.save()
        serializer = AddressSerializer(address)
        return Response(serializer.data)

class AddressListAPIView(APIView):
    def get(self, request, pk):
        listAddress = Address.objects.filter(user_id = pk)
        serializer = AddressSerializer(listAddress, many=True)
        return Response(serializer.data)
    def post(self, request, pk):
        data = request.data
        fullName = data['fullName']
        phoneNumber = data['phoneNumber']
        city = data['city']
        district = data['district']
        detail = data['detail']
        user = User.objects.get(pk = pk)
        address = Address(fullName=fullName, phoneNumber=phoneNumber, city=city, district=district,
                detail=detail, user=user)
        address.save()
        serializer = AddressSerializer(address)
        return Response(serializer.data)