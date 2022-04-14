# Generated by Django 4.0.2 on 2022-04-13 15:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Clothes',
            fields=[
                ('product_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='product.product')),
                ('material', models.CharField(default='', max_length=255)),
                ('countryOfOrigin', models.CharField(default='', max_length=255)),
                ('size', models.CharField(default='', max_length=255)),
                ('pattern', models.CharField(default='', max_length=255)),
                ('plusSize', models.BooleanField(default=False)),
                ('brand', models.CharField(default='', max_length=255)),
                ('season', models.CharField(default='', max_length=255)),
            ],
            bases=('product.product',),
        ),
        migrations.CreateModel(
            name='FemaleClothes',
            fields=[
                ('clothes_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='clothes.clothes')),
                ('petite', models.BooleanField(default=False)),
                ('occasion', models.CharField(default='', max_length=255)),
            ],
            bases=('clothes.clothes',),
        ),
        migrations.CreateModel(
            name='KidClothes',
            fields=[
                ('clothes_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='clothes.clothes')),
                ('gender', models.CharField(default='', max_length=255)),
                ('recommendedAge', models.CharField(default='', max_length=255)),
            ],
            bases=('clothes.clothes',),
        ),
        migrations.CreateModel(
            name='MaleClothes',
            fields=[
                ('clothes_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='clothes.clothes')),
                ('tallfit', models.BooleanField(default=False)),
            ],
            bases=('clothes.clothes',),
        ),
        migrations.CreateModel(
            name='Dress',
            fields=[
                ('femaleclothes_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='clothes.femaleclothes')),
                ('length', models.FloatField(default=0)),
                ('style', models.CharField(default='', max_length=255)),
            ],
            bases=('clothes.femaleclothes',),
        ),
        migrations.CreateModel(
            name='FemalePant',
            fields=[
                ('femaleclothes_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='clothes.femaleclothes')),
                ('bottomsLength', models.FloatField(default=0)),
                ('waistHeight', models.FloatField(default=0)),
            ],
            bases=('clothes.femaleclothes',),
        ),
        migrations.CreateModel(
            name='FemaleShirt',
            fields=[
                ('femaleclothes_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='clothes.femaleclothes')),
                ('neckline', models.CharField(default='', max_length=255)),
                ('croppedTop', models.BooleanField(default=False)),
                ('topLength', models.FloatField(default=0)),
                ('sleeveLength', models.FloatField(default=0)),
            ],
            bases=('clothes.femaleclothes',),
        ),
        migrations.CreateModel(
            name='MalePant',
            fields=[
                ('maleclothes_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='clothes.maleclothes')),
                ('length', models.FloatField(default=0)),
            ],
            bases=('clothes.maleclothes',),
        ),
        migrations.CreateModel(
            name='MaleShirt',
            fields=[
                ('maleclothes_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='clothes.maleclothes')),
                ('sleeveLength', models.FloatField(default=0)),
            ],
            bases=('clothes.maleclothes',),
        ),
    ]
