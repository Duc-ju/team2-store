from rest_framework import serializers
from .models import ProductItem, Product, Product_Img
from book.models import Book
from book.serializers import BookSerializer
from clothes.models import MalePant, MaleShirt, FemalePant, Dress, FemaleShirt, KidClothes
from clothes.serializers import MalePantSerializer, MaleShirtSerializer, FemalePantSerializer, DressSerializer, FemaleShirtSerializer, KidClothesSerializer
from mobiledevice.models import Laptop, MobilePhone, Tablet
from mobiledevice.serializers import LaptopSerializer, MobilePhoneSerializer, TabletSerializer


class ProductSerializer(serializers.ModelSerializer):

    meta = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model= Product
        fields = ['id', 'name', 'prices', 'quantity', 'meta']

    def get_meta(self, obj):
        # Laptop
        try:
            product = Laptop.objects.get(pk=obj.id)
            serializer = LaptopSerializer(product)
            return serializer.data
        except:
            # Book
            try:
                product = Book.objects.get(pk=obj.id)
                serializer = BookSerializer(product)
                return serializer.data
            except:
                # MobilePhone
                try:
                    product = MobilePhone.objects.get(pk=obj.id)
                    serializer = MobilePhoneSerializer(product)
                    return serializer.data
                except:
                    # MobilePhone
                    try:
                        product = Tablet.objects.get(pk=obj.id)
                        serializer = TabletSerializer(product)
                        return serializer.data
                    except:
                        # FemalePant
                        try:
                            product = FemalePant.objects.get(pk=obj.id)
                            serializer = FemalePantSerializer(product)
                            return serializer.data
                        except:
                            # FemaleShirt
                            try:
                                product = FemaleShirt.objects.get(pk=obj.id)
                                serializer = FemaleShirtSerializer(product)
                                return serializer.data
                            except:
                                # Dress
                                try:
                                    product = Dress.objects.get(pk=obj.id)
                                    serializer = DressSerializer(product)
                                    return serializer.data
                                except:
                                    # Malepant
                                    try:
                                        product = MalePant.objects.get(pk=obj.id)
                                        serializer = MalePantSerializer(product)
                                        return serializer.data
                                    except:
                                        # MaleShirt
                                        try:
                                            product = MaleShirt.objects.get(pk=obj.id)
                                            serializer = MaleShirtSerializer(product)
                                            return serializer.data
                                        except:
                                            # KidClothes
                                            try:
                                                product = KidClothes.objects.get(pk=obj.id)
                                                serializer = KidClothesSerializer(product)
                                                return serializer.data
                                            except:
                                                return {}



class ImageProductItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product_Img
        fields = ['id', 'image']

class ProductItemDetailSerializer(serializers.ModelSerializer):
    images = ImageProductItemSerializer(many=True, read_only=True)
    product = ProductSerializer()
    class Meta:
        model = ProductItem
        fields = ['id', 'header', 'prices', 'description', 'discount', 'rate', 'product', 'images']
