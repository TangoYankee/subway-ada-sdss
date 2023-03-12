from rest_framework_gis.serializers import GeoFeatureModelSerializer
from ada_stations.models import (
    BusRoute,
    BusStop,
    BusRouteExpress,
    BusStopExpress,
    Hospital,
    Park,
    School,
    SubwayEntrance,
    SubwayRoute,
    SubwayStation,
)


class BusRouteSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = BusRoute
        fields = "__all__"
        geo_field = "geom"


class BusStopSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = BusStop
        fields = "__all__"
        geo_field = "geom"


class BusRouteExpressSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = BusRouteExpress
        fields = "__all__"
        geo_field = "geom"


class BusStopExpressSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = BusStopExpress
        fields = "__all__"
        geo_field = "geom"


class HospitalSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Hospital
        fields = "__all__"
        geo_field = "geom"


class ParkSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Park
        fields = "__all__"
        geo_field = "geom"


class SchoolSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = School
        fields = "__all__"
        geo_field = "geom"


class SubwayEntranceSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = SubwayEntrance
        fields = "__all__"
        geo_field = "geom"


class SubwayRouteSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = SubwayRoute
        fields = "__all__"
        geo_field = "geom"


class SubwayStationSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = SubwayStation
        fields = "__all__"
        geo_field = "geom"
