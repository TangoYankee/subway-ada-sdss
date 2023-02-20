from rest_framework import viewsets
from rest_framework_gis.filters import DistanceToPointFilter, InBBoxFilter
from rest_framework_gis.pagination import GeoJsonPagination
from world.serializers import WorldBorderSerializer
from world.models import WorldBorder

class MyPagination(GeoJsonPagination):
    page_size_query_param = 'page_size'

class WorldBorderViewSet(viewsets.ModelViewSet):
    queryset = WorldBorder.objects.all()
    serializer_class = WorldBorderSerializer
    pagination_class = MyPagination
    filter_backends = (DistanceToPointFilter, InBBoxFilter)
    distance_filter_field = 'mpoly'
    bbox_filter_field = 'mpoly'
    bbox_filter_include_overlapping = True
