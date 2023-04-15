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
    SubwayStation500BufferSerializer,
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
    SubwayStation500mBuffer,
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


class SubwayStation500BufferViewSet(viewsets.ModelViewSet):
    queryset = SubwayStation500mBuffer.objects.all()
    serializer_class = SubwayStation500BufferSerializer


class TractDemographicViewSet(viewsets.ModelViewSet):
    queryset = TractDemographic.objects.all()
    serializer_class = TractDemographicSerializer


# constants that should not be redefined on every rankings request
station_buffer = 500
batch_size = 80
ada_min_code = 3
counted_factors_map = {
    "parks": Park,
    "schools": School,
    "hospitals": Hospital,
    "bus_stops": BusStop,
    "bus_stops_express": BusStopExpress,
}

tract_factors = [
    "total",
    "under_five",
    "sixty_five_and_over",
    "poverty_total",
    "poverty_under_five",
    "poverty_sixty_five_and_over",
    "under_eighteen_ambulatory",
    "over_eighteen_under_sixty_five_ambulatory",
    "sixty_five_and_over_ambulatory",
]


class RankingView(APIView):
    def get(self, request):
        query_string = request.GET
        all_factors = list(counted_factors_map.keys()) + tract_factors
        factor_weights = {
            factor: int(query_string.get(factor) or 0) for factor in all_factors
        }

        total_weight = sum(factor_weights.values())
        # Use 1 as fallback for total factor weights, to prevent division by 0
        total_weight = total_weight if total_weight > 0 else 1
        proportional_weights = {
            key: value / total_weight for (key, value) in factor_weights.items()
        }

        stations = SubwayStationADA.objects.all().filter(
            ada_status_code__gte=ada_min_code
        )

        station_totals = {}
        meta_data = {}
        requested_tract_factors = [
            factor for factor in tract_factors if factor_weights[factor] > 0
        ]
        requested_counted_factors = {
            factor: model
            for factor, model in counted_factors_map.items()
            if factor_weights[factor] > 0
        }
        requested_factors = (
            list(requested_counted_factors.keys()) + requested_tract_factors
        )

        for station in stations:
            station_totals[station.id] = {factor: station[factor] for factor in requested_factors}

            meta_data[station.id] = {
                "id": station.id,
                "name": station.name,
                "lines": station.lines,
                "ada_status_code": station.ada_status_code,
            }

        # for index, station in enumerate(stations):
        #     # Default totals for requested values
        #     factor_totals = {factor: 0 for factor in requested_factors}

        #     # Find totals for countable factors
        #     for factor, model in requested_counted_factors.items():
        #         factor_count = model.objects.filter(
        #             geom__distance_lte=(station.geom, station_buffer)
        #         ).count()
        #         factor_totals[factor] = factor_count

        #     # Find sums for tract factors
        #     tracts = TractDemographic.objects.all().filter(
        #         geom__distance_lte=(station.geom, station_buffer)
        #     )
        #     for tract in tracts:
        #         for tract_factor in requested_tract_factors:
        #             factor_totals[tract_factor] += getattr(tract, tract_factor)

        #     meta_data[station.id] = {
        #         "id": station.id,
        #         "name": station.name,
        #         "lines": station.lines,
        #         "ada_status_code": station.ada_status_code,
        #     }
        #     station_totals[station.id] = factor_totals

        max_factor_totals = {}
        for count in station_totals.values():
            for key, value in count.items():
                # Use 1 for fallback of max, as a hack to prevent division by zero errors
                max_factor_totals[key] = max([value, max_factor_totals.get(key, 1)])

        scores = {}
        for station_id, station_factor_totals in station_totals.items():
            score = 0
            for factor, count in station_factor_totals.items():
                score += (count / max_factor_totals[factor]) * proportional_weights[
                    factor
                ]
            scores[station_id] = score

        ranked_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        rankings = {}
        for index, data in enumerate(ranked_scores):
            id, score = data
            ranking = index + 1
            batch = ranking // batch_size
            rankings[id] = {
                **meta_data[id],
                "score": score,
                "ranking": ranking,
                "batch": batch,
                **station_totals[id],
            }

        return Response(rankings)
