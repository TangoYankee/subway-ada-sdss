from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from ..models import SubwayStation

subwaystation_mapping = {
    "complex_id": "complex_id",
    "complex_nm": "complex_nm",
    "trains": "trains",
    "station_ct": "station_ct",
    "tot2019": "tot2019",
    "geom": "POINT",
}


subwaystation_geojson = (
    Path(__file__).resolve().parent.parent / "data" / "subway_stations_2019.geojson"
)


def run(verbose=True):
    lm = LayerMapping(
        SubwayStation, subwaystation_geojson, subwaystation_mapping, transform=False
    )
    lm.save(strict=True, verbose=verbose)
