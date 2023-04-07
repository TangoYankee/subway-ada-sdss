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


class SubwayEntrance(models.Model):
    line = models.CharField(max_length=254)
    station_name = models.CharField(max_length=254)
    route_1 = models.CharField(max_length=254, blank=True, null=True)
    route_2 = models.CharField(max_length=254, blank=True, null=True)
    route_3 = models.CharField(max_length=254, blank=True, null=True)
    route_4 = models.CharField(max_length=254, blank=True, null=True)
    route_5 = models.CharField(max_length=254, blank=True, null=True)
    route_6 = models.CharField(max_length=254, blank=True, null=True)
    route_7 = models.CharField(max_length=254, blank=True, null=True)
    route_8 = models.BigIntegerField(blank=True, null=True)
    route_9 = models.BigIntegerField(blank=True, null=True)
    route_10 = models.BigIntegerField(blank=True, null=True)
    route_11 = models.BigIntegerField(blank=True, null=True)
    entrance_type = models.CharField(max_length=254)
    entry = models.CharField(max_length=254)
    exit_only = models.CharField(max_length=254, blank=True, null=True)
    ada = models.CharField(max_length=254)
    ada_notes = models.CharField(max_length=254, blank=True, null=True)
    free_cross = models.CharField(max_length=254, blank=True, null=True)
    corner = models.CharField(max_length=254, blank=True, null=True)
    geom = models.PointField(srid=4326)

    def __str__(self):
        return f"{self.station_name}-{self.corner}-{self.entrance_type}"


class SubwayRoute(models.Model):
    route_id = models.CharField(max_length=80)
    route_shor = models.CharField(max_length=80)
    route_long = models.CharField(max_length=80)
    color = models.CharField(max_length=80)
    group = models.CharField(max_length=80)
    geom = models.MultiLineStringField(srid=4326)

    def __str__(self):
        return self.route_id


class SubwayStation(models.Model):
    complex_id = models.CharField(max_length=80)
    complex_nm = models.CharField(max_length=80)
    trains = models.CharField(max_length=80)
    station_ct = models.CharField(max_length=80)
    tot2019 = models.CharField(max_length=80)
    geom = models.PointField(srid=4326)

    def __str__(self):
        return f"{self.complex_nm}-{self.trains}"


class SubwayStationADA(models.Model):
    name = models.CharField(max_length=80)
    lines = models.CharField(max_length=80)
    complex_id = models.CharField(max_length=80)
    gtfs_stop_id = models.CharField(max_length=80)
    ada_status_code = models.IntegerField()
    geom = models.PointField(srid=4326)

    def __str__(self):
        return f"{self.name}: {self.lines}"


class TractDemographic(models.Model):
    geoid = models.CharField(max_length=80)
    total = models.IntegerField()
    under_five = models.IntegerField()
    sixty_five_and_over = models.IntegerField()
    poverty_total = models.IntegerField()
    poverty_under_five = models.IntegerField()
    poverty_sixty_five_and_over = models.IntegerField()
    under_eighteen_ambulatory = models.IntegerField()
    over_eighteen_under_sixty_five_ambulatory = models.IntegerField()
    sixty_five_and_over_ambulatory = models.IntegerField()
    geom = models.MultiPolygonField(srid=4326)

    def __str__(self):
        return self.geoid
