from itertools import chain

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework.generics import CreateAPIView


class UserAPIView(CreateAPIView):
    permission_classes = [AllowAny]
    model = Customer
    serializer_class = CustomerCreateSerializer


class UserDetailAPIView(APIView):

    def get(self, request, pk):
        is_staff = request.user.is_staff
        id = request.user.id
        if not is_staff and id != pk:
            return Response({
                'status': '400',
                'message': 'Not has permission'
            })
        try:
            user = Customer.objects.get(pk=pk)
        except Customer.DoesNotExist:
            return Response({
                'status': 404,
                'message': 'User not found'
            })
        serializer = CustomerSerializer(user)
        return Response(serializer.data)


class UpdateProfile(CreateAPIView):
    def patch(self, request, id):
        data = request.data
        user = Customer.objects.get(pk=id)
        if user is not None:
            user.displayName = data['displayName']
            user.email = data['email']
            user.gender = data['gender']
            user.save()
        serializer = CustomerSerializer(user)
        return Response(serializer.data)
