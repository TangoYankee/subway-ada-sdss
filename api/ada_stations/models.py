# This is an auto-generated Django model module created by ogrinspect.
from django.contrib.gis.db import models

class BusRoute(models.Model):
    route_id = models.CharField(max_length=80)
    route_dir = models.CharField(max_length=80)
    route_shor = models.CharField(max_length=80)
    route_long = models.CharField(max_length=80)
    color = models.CharField(max_length=80)
    geom = models.MultiLineStringField(srid=4326)

    # Returns the route id of the model
    def __str__(self):
        return self.route_id
