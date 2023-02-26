# Generated by Django 4.1.7 on 2023-02-26 00:23

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ada_stations', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BusStop',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stop_id', models.IntegerField()),
                ('stop_name', models.CharField(max_length=80)),
                ('stop_lat', models.FloatField()),
                ('stop_lon', models.FloatField()),
                ('geoid', models.CharField(max_length=80)),
                ('namelsad', models.CharField(max_length=80)),
                ('geom', django.contrib.gis.db.models.fields.PointField(srid=4326)),
            ],
        ),
    ]
