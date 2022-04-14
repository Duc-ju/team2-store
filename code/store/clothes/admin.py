from django.contrib import admin
from .models import Clothes, KidClothes, MaleClothes, FemaleClothes, FemalePant, MalePant, FemaleShirt, MaleShirt, Dress
# Register your models here.
admin.site.register(Clothes)
admin.site.register(KidClothes)
admin.site.register(MaleClothes)
admin.site.register(FemaleClothes)
admin.site.register(FemalePant)
admin.site.register(MalePant)
admin.site.register(FemaleShirt)
admin.site.register(MaleShirt)
admin.site.register(Dress)

