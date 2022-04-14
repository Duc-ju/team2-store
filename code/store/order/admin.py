from django.contrib import admin
from .models import Order, OrderProduct, Payment, Cash, Credit, Tranfer, Voucher, Feedback, Shipment
# Register your models here.
admin.site.register(Order)
admin.site.register(OrderProduct)
admin.site.register(Payment)
admin.site.register(Cash)
admin.site.register(Credit)
admin.site.register(Tranfer)
admin.site.register(Voucher)
admin.site.register(Feedback)
admin.site.register(Shipment)


