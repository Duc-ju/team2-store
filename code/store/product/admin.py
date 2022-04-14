from django.contrib import admin
from .models import Product, Product_Img, ProductItem
# Register your models here.
admin.site.register(Product)
admin.site.register(Product_Img)
admin.site.register(ProductItem)