from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from ..models import SubwayStation500mBuffer

subwaystation500mbuffer_mapping = {
    "name": "name",
    "line": "line",
    "complex_id": "complex_id",
    "gtfs_stop_id": "gtfs_stop_id",
    "ada_status_code": "ada_status_code",
    "schools": "schools",
    "parks": "parks",
    "hospitals": "hospitals",
    "bus_stops": "bus_stops",
    "bus_stops_express": "bus_stops_express",
    "total": "total",
    "under_five": "under_5",
    "sixty_five_and_over": "65_and_over",
    "poverty_total": "poverty_total",
    "poverty_under_five": "poverty_under_5",
    "poverty_sixty_five_and_over": "poverty_65_and_over",
    "under_eighteen_ambulatory": "under_18_ambulatory",
    "over_eighteen_under_sixty_five_ambulatory": "over_18_under_65_ambulatory",
    "sixty_five_and_over_ambulatory": "65_and_over_ambulatory",
    "geom": "POINT",
}

subwaystation500mbuffer_geojson = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "subway_stations_500_buffer.geojson"
)


def run(verbose=True):
    lm = LayerMapping(
        SubwayStation500mBuffer,
        subwaystation500mbuffer_geojson,
        subwaystation500mbuffer_mapping,
        transform=False,
    )
    lm.save(strict=True, verbose=verbose)
