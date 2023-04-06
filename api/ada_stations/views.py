from rest_framework import viewsets
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.gis.measure import D
from ada_stations.serializers import (
    BusRouteSerializer,
    BusStopSerializer,
    BusRouteExpressSerializer,
    BusStopExpressSerializer,
    HospitalSerializer,
    ParkSerializer,
    SchoolSerializer,
    SubwayEntranceSerializer,
    SubwayRouteSerializer,
    SubwayStationSerializer,
    TractDemographicSerializer,
)
from ada_stations.models import (
    BusRoute,
    BusStop,
    BusRouteExpress,
    BusStopExpress,
    Hospital,
    Park,
    School,
    SubwayEntrance,
    SubwayRoute,
    SubwayStation,
    TractDemographic,
)


class BusRouteViewSet(viewsets.ModelViewSet):
    queryset = BusRoute.objects.all()
    serializer_class = BusRouteSerializer


class BusStopViewSet(viewsets.ModelViewSet):
    queryset = BusStop.objects.all()
    serializer_class = BusStopSerializer


class BusRouteExpressViewSet(viewsets.ModelViewSet):
    queryset = BusRouteExpress.objects.all()
    serializer_class = BusRouteExpressSerializer


class BusStopExpressViewSet(viewsets.ModelViewSet):
    queryset = BusStopExpress.objects.all()
    serializer_class = BusStopExpressSerializer


class HospitalViewSet(viewsets.ModelViewSet):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer


class ParkViewSet(viewsets.ModelViewSet):
    queryset = Park.objects.all()
    serializer_class = ParkSerializer


class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer


class SubwayEntranceViewSet(viewsets.ModelViewSet):
    queryset = SubwayEntrance.objects.all()
    serializer_class = SubwayEntranceSerializer


class SubwayRouteViewSet(viewsets.ModelViewSet):
    queryset = SubwayRoute.objects.all()
    serializer_class = SubwayRouteSerializer


class SubwayStationViewSet(viewsets.ModelViewSet):
    queryset = SubwayStation.objects.all()
    serializer_class = SubwayStationSerializer


class TractDemographicViewSet(viewsets.ModelViewSet):
    queryset = TractDemographic.objects.all()
    serializer_class = TractDemographicSerializer

class RankingView(APIView):
    def get(self, request):
        station_buffer = 500
        factor_weights = {
            "schools": 100,
            "hospitals": 100,
        }
        
        total_weight = sum(factor_weights.values())
        proportional_weights = { key: value / total_weight for(key, value) in factor_weights.items() }

        stations = SubwayStation.objects.all()[:5]
        rankings = [None] * len(stations)
        counts = {}
        for index, station in enumerate(stations):
            hospital_count = Hospital.objects.filter(geom__distance_lte=(station.geom,station_buffer)).count()
            school_count = School.objects.filter(geom__distance_lte=(station.geom,station_buffer)).count()
            ranking = {
                "station_id": station.id,
                "hospital_count": hospital_count,
                "school_count" : school_count,
            }
            count = {
                "hospitals": hospital_count,
                "schools" : school_count,
            }
            counts[station.id] = count

            rankings[index] = ranking

        max_counts = {}
        for count in counts.values():
            for key, value in count.items():
                max_counts[key] = max([value, max_counts.get(key, 0)])
        
        scores = {}
        for station_id, factor_counts in counts.items():
            score = 0
            for factor, count in factor_counts.items():
                print('factor', factor)
                print('count', count)
                print('max_counts[factor]', max_counts[factor])
                score += (count / max_counts[factor]) * proportional_weights[factor] 

            print('score', score)
            scores[station_id] = score
        print( 'scores', scores)

        return Response(rankings)