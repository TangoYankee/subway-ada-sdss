import json
from rest_framework import viewsets
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.gis.measure import D
from django.forms.models import model_to_dict
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

        query_string = request.GET
        factor_weights = {
            "parks": int(query_string.get("parks") or 0),
            "schools": int(query_string.get("schools") or 0),
            "hospitals": int(query_string.get("hospitals") or 0),
            "bus_stops": int(query_string.get("bus_stops") or 0),
            "bus_stops_express": int(query_string.get("bus_stops_express") or 0),
        }

        total_weight = sum(factor_weights.values())
        # Use 1 as fallback for total factor weights, to prevent division by 0
        total_weight = total_weight if total_weight > 0 else 1
        proportional_weights = {
            key: value / total_weight for (key, value) in factor_weights.items()
        }

        stations = SubwayStationADA.objects.all().filter(ada_status_code__gte=3)

        counts = {}
        meta_data = {}
        for index, station in enumerate(stations):
            count = {}
            for factor, model in model_map.items():
                factor_count = model.objects.filter(
                    geom__distance_lte=(station.geom, station_buffer)
                ).count()
                count[factor] = factor_count
            counts[station.id] = count
            meta_data[station.id] = {
                "id": station.id,
                "name": station.name,
                "lines": station.lines,
                "ada_status_code": station.ada_status_code,
            }

        max_counts = {}
        for count in counts.values():
            for key, value in count.items():
                # Use 1 for fallback of max, as a hack to prevent division by zero errors
                max_counts[key] = max([value, max_counts.get(key, 1)])

        scores = {}
        for station_id, factor_counts in counts.items():
            score = 0
            for factor, count in factor_counts.items():
                score += (count / max_counts[factor]) * proportional_weights[factor]
            scores[station_id] = score

        ranked_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        rankings = {}
        for index, data in enumerate(ranked_scores):
            id, score = data
            ranking = index + 1
            batch = ranking // batch_size + 1
            rankings[id] = {
                **meta_data[id],
                "score": score,
                "ranking": ranking,
                "batch": batch,
                **counts[id],
            }

        return Response(rankings)
