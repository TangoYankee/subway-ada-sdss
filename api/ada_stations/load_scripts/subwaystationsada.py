from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from ..models import SubwayStationADA

subwaystationada_mapping = {
    "name": "name",
    "lines": "line",
    "complex_id": "complex_id",
    "gtfs_stop_id": "gtfs_stop_id",
    "ada_status_code": "ada_status_code",
    "geom": "POINT",
}

subwaystationada_geojson = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "subway_station_accessibility.geojson"
)


def run(verbose=True):
    lm = LayerMapping(
        SubwayStationADA,
        subwaystationada_geojson,
        subwaystationada_mapping,
        transform=False,
    )
    lm.save(strict=True, verbose=verbose)
