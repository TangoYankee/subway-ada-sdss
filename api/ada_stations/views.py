from rest_framework import viewsets
from rest_framework_gis.filters import DistanceToPointFilter, InBBoxFilter
from ada_stations.serializers import BusRoutesSerializer
from ada_stations.models import BusRoutes

class BusRoutesViewSet(viewsets.ModelViewSet):
    queryset = BusRoutes.objects.all()
    serializer_class = BusRoutesSerializer
    filter_backends = (DistanceToPointFilter, InBBoxFilter)
    distance_filter_field = 'geom'
    bbox_filter_field = 'geom'
    bbox_filter_include_overlapping = True
