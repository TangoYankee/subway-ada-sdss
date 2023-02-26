from rest_framework_gis.serializers import GeoFeatureModelSerializer
from ada_stations.models import BusRoute, BusStop

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
