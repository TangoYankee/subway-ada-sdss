# Generated by Django 4.1.7 on 2023-02-26 03:46

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ada_stations', '0003_busstopexpress'),
    ]

    operations = [
        migrations.CreateModel(
            name='BusRouteExpress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('route_id', models.CharField(max_length=80)),
                ('route_dir', models.CharField(max_length=80)),
                ('route_shor', models.CharField(max_length=80)),
                ('route_long', models.CharField(max_length=80)),
                ('color', models.CharField(max_length=80)),
                ('geom', django.contrib.gis.db.models.fields.MultiLineStringField(srid=4326)),
            ],
        ),
    ]