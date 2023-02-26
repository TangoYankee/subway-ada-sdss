from rest_framework_gis.serializers import GeoFeatureModelSerializer
from ada_stations.models import BusRoute, BusStop, BusRouteExpress, BusStopExpress

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
