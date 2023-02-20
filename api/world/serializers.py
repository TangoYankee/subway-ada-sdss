from rest_framework_gis.serializers import GeoFeatureModelSerializer
from world.models import WorldBorder

class WorldBorderSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = WorldBorder
        geo_field = 'mpoly'
        auto_bbox = True
        fields = ('__all__')
