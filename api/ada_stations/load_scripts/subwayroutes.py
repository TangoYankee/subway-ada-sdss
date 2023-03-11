from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from ..models import SubwayRoute

subwayroute_mapping = {
    "route_id": "route_id",
    "route_shor": "route_shor",
    "route_long": "route_long",
    "color": "color",
    "group": "group",
    "geom": "MULTILINESTRING",
}

subwayroute_shp = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "routes_nyc_subway_nov2020"
    / "routes_nyc_subway_nov2020.shp"
)


def run(verbose=True):
    lm = LayerMapping(SubwayRoute, subwayroute_shp, subwayroute_mapping, transform=True)
    lm.save(strict=True, verbose=verbose)
