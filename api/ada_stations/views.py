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
    SubwayStationADASerializer,
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
    SubwayStationADA,
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


class SubwayStationADAViewSet(viewsets.ModelViewSet):
    queryset = SubwayStationADA.objects.all()
    serializer_class = SubwayStationADASerializer

class TractDemographicViewSet(viewsets.ModelViewSet):
    queryset = TractDemographic.objects.all()
    serializer_class = TractDemographicSerializer


class RankingView(APIView):
    def get(self, request):
        station_buffer = 500
        batch_size = 80
        model_map = {
            "parks": Park,
            "schools": School,
            "hospitals": Hospital,
            "bus_stops": BusStop,
            "bus_stops_express": BusStopExpress,
        }
        factor_weights = {
            "parks": 60,
            "schools": 40,
            "hospitals": 100,
            "bus_stops": 50,
            "bus_stops_express": 75,
        }

        total_weight = sum(factor_weights.values())
        proportional_weights = {
            key: value / total_weight for (key, value) in factor_weights.items()
        }

        stations = SubwayStation.objects.all()[:5]
        counts = {}
        for index, station in enumerate(stations):
            count = {}
            for factor, model in model_map.items():
                factor_count = model.objects.filter(
                    geom__distance_lte=(station.geom, station_buffer)
                ).count()
                count[factor] = factor_count
            counts[station.id] = count

        max_counts = {}
        for count in counts.values():
            for key, value in count.items():
                max_counts[key] = max([value, max_counts.get(key, 0)])

        scores = {}
        for station_id, factor_counts in counts.items():
            score = 0
            for factor, count in factor_counts.items():
                score += (count / max_counts[factor]) * proportional_weights[factor]
            scores[station_id] = score

        ranked_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        rankings = [None] * len(ranked_scores)
        for index, data in enumerate(ranked_scores):
            id, score = data
            ranking = index + 1
            batch = ranking // batch_size + 1
            rankings[index] = {
                "station_id": id,
                "score": score,
                "ranking": ranking,
                "batch": batch,
            }

        return Response(rankings)
