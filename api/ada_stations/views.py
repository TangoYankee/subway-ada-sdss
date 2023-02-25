from rest_framework import viewsets
from ada_stations.serializers import BusRouteSerializer
from ada_stations.models import BusRoute

class BusRouteViewSet(viewsets.ModelViewSet):
    queryset = BusRoute.objects.all()
    serializer_class = BusRouteSerializer
