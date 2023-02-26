from rest_framework import viewsets
from ada_stations.serializers import BusRouteSerializer, BusStopSerializer, BusStopExpressSerializer
from ada_stations.models import BusRoute, BusStop, BusStopExpress

class BusRouteViewSet(viewsets.ModelViewSet):
    queryset = BusRoute.objects.all()
    serializer_class = BusRouteSerializer

class BusStopViewSet(viewsets.ModelViewSet):
    queryset = BusStop.objects.all()
    serializer_class = BusStopSerializer

class BusStopExpressViewSet(viewsets.ModelViewSet):
    queryset = BusStopExpress.objects.all()
    serializer_class = BusStopExpressSerializer
