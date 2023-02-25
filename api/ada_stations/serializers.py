from rest_framework_gis.serializers import GeoFeatureModelSerializer
from ada_stations.models import BusRoutes

class BusRoutesSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = BusRoutes
        geo_field ='geom'
        auto_bbox = True
        fields = ('__all__')
