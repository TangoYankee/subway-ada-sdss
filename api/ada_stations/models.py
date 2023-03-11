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


class BusStop(models.Model):
    stop_id = models.IntegerField()
    stop_name = models.CharField(max_length=80)
    stop_lat = models.FloatField()
    stop_lon = models.FloatField()
    geoid = models.CharField(max_length=80)
    namelsad = models.CharField(max_length=80)
    geom = models.PointField(srid=4326)

    def __str__(self):
        return self.stop_name


class BusRouteExpress(models.Model):
    route_id = models.CharField(max_length=80)
    route_dir = models.CharField(max_length=80)
    route_shor = models.CharField(max_length=80)
    route_long = models.CharField(max_length=80)
    color = models.CharField(max_length=80)
    geom = models.MultiLineStringField(srid=4326)

    def __str__(self):
        return self.route_id


class BusStopExpress(models.Model):
    stop_id = models.IntegerField()
    stop_name = models.CharField(max_length=80)
    stop_lat = models.FloatField()
    stop_lon = models.FloatField()
    geoid = models.CharField(max_length=80)
    namelsad = models.CharField(max_length=80)
    geom = models.PointField(srid=4326)

    def __str__(self):
        return self.stop_name


class Hospital(models.Model):
    facility_type = models.CharField(max_length=80)
    facility_name = models.CharField(max_length=80)
    geom = models.PointField(srid=4326)

    def __str__(self):
        return self.facility_name


class Park(models.Model):
    acres = models.CharField(max_length=80)
    location = models.CharField(max_length=100)
    signname = models.CharField(max_length=80)
    typecategory = models.CharField(max_length=80)
    waterfront = models.CharField(max_length=80, blank=True, null=True)
    geom = models.MultiPolygonField(srid=4326)

    def __str__(self):
        return self.location


class School(models.Model):
    system_code = models.CharField(max_length=80)
    location_code = models.CharField(max_length=80)
    location_name = models.CharField(max_length=80)
    managed_by_name = models.CharField(max_length=80)
    location_type_description = models.CharField(max_length=80)
    location_category_description = models.CharField(max_length=80)
    status_descriptions = models.CharField(max_length=80)
    primary_address_line_1 = models.CharField(max_length=80)
    geom = models.PointField(srid=4326)

    def __str__(self):
        return self.location_name
