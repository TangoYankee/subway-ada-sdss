from rest_framework_gis.serializers import GeoFeatureModelSerializer
from ada_stations.models import BusRoute

class BusRouteSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = BusRoute
        fields = "__all__"
        geo_field = "geom"
