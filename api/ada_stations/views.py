from rest_framework import viewsets
from ada_stations.serializers import BusRouteSerializer, BusStopSerializer
from ada_stations.models import BusRoute, BusStop

class BusRouteViewSet(viewsets.ModelViewSet):
    queryset = BusRoute.objects.all()
    serializer_class = BusRouteSerializer

class BusStopViewSet(viewsets.ModelViewSet):
    queryset = BusStop.objects.all()
    serializer_class = BusStopSerializer
