from django.contrib import admin
from .models import Laptop, Tablet, MobileDevice, MobilePhone
# Register your models here.
admin.site.register(Laptop)
admin.site.register(Tablet)
admin.site.register(MobileDevice)
admin.site.register(MobilePhone)