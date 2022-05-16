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

class UpdateProfile(CreateAPIView):
    def post(self, request, id):
        data = request.data
        user = Customer.objects.get(pk=id)
        if user is not None:
            user.displayName = data['displayName']
            user.email = data['email']
            user.gender = data['gender']
            user.save()
        serializer = CustomerSerializer(user)
        return Response(serializer.data)