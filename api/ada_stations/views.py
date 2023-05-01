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
    SubwayRouteSerializer,
    SubwayStationSerializer,
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
    SubwayRoute,
    SubwayStation,
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


class SubwayRouteViewSet(viewsets.ModelViewSet):
    queryset = SubwayRoute.objects.all()
    serializer_class = SubwayRouteSerializer


class SubwayStationViewSet(viewsets.ModelViewSet):
    queryset = SubwayStation.objects.all()
    serializer_class = SubwayStationSerializer


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
counted_factors_map = [ 
    "parks",
    "schools",
    "hospitals",
    "bus_stops",
    "bus_stops_express",
 ]

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

station_trait_factors = [
    "ridership",
    "ada_neighbor_gap",
    "betweenness_centrality",
]


class RankingView(APIView):
    def get(self, request):
        query_string = request.GET
        all_factors = counted_factors_map + tract_factors + station_trait_factors
        factor_weights = {
            factor: int(query_string.get(factor) or 0) for factor in all_factors
        }

        total_weight = sum(factor_weights.values())
        # Use 1 as fallback for total factor weights, to prevent division by 0
        total_weight = total_weight if total_weight > 0 else 1
        proportional_weights = {
            key: value / total_weight for (key, value) in factor_weights.items()
        }

        stations_traits = SubwayStation.objects.all().filter(
            ada_status_code__gte=ada_min_code
        )

        stations_buffer = SubwayStation500mBuffer.objects.all().filter(
            ada_status_code__gte=ada_min_code
        )

        buffer_factors = counted_factors_map + tract_factors
        requested_buffer_factors = [ 
            factor for factor in buffer_factors if factor_weights[factor] > 0
         ]
        requested_trait_factors = [
            factor for factor in station_trait_factors if factor_weights[factor] > 0
        ]

        station_totals = {}
        buffer_complex_ids = set()
        for station in stations_buffer:
            buffer_complex_ids.add(station.complex_id)
            station_totals[station.complex_id] = {
                factor: getattr(station, factor) for factor in requested_buffer_factors
            }

        meta_data = {}
        trait_complex_ids = set()
        for station in stations_traits:
            complex_id = station.complex_id
            trait_complex_ids.add(complex_id)
            # print(f'trait id: {station.complex_id}')
            buffer_factors_totals = station_totals[complex_id]
            trait_factors_totals = { factor: float(getattr(station, factor) or 0) * 1000 for factor in requested_trait_factors }
            station_totals[complex_id] = trait_factors_totals | buffer_factors_totals

            meta_data[complex_id] = {
                "complex_id":complex_id,
                "name": station.name,
                "lines": station.lines,
                "ada_status_code": station.ada_status_code,
            }

        max_factor_totals = {}
        for count in station_totals.values():
            for key, value in count.items():
                # Use 1 for fallback of max, as a hack to prevent division by zero errors
                max_factor_totals[key] = max([value, max_factor_totals.get(key, 1)])

        scores = {}
        for complex_id, station_factor_totals in station_totals.items():
            score = 0
            for factor, count in station_factor_totals.items():
                score += (count / max_factor_totals[factor]) * proportional_weights[
                    factor
                ]
            scores[complex_id] = score

        ranked_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        rankings = {}
        for index, data in enumerate(ranked_scores):
            complex_id, score = data
            ranking = index + 1
            batch = ranking // batch_size
            rankings[complex_id] = {
                **meta_data[complex_id],
                "score": score,
                "ranking": ranking,
                "batch": batch,
            }

        return Response(rankings)
