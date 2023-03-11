from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from ..models import BusRoute

# Auto-generated `LayerMapping` dictionary for BusRoutes model
busroute_mapping = {
    "route_id": "route_id",
    "route_dir": "route_dir",
    "route_shor": "route_shor",
    "route_long": "route_long",
    "color": "color",
    "geom": "MULTILINESTRING",
}

busroute_shp = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "bus_routes_nyc_nov2020"
    / "bus_routes_nyc_nov2020.shp"
)


def run(verbose=True):
    lm = LayerMapping(BusRoute, busroute_shp, busroute_mapping, transform=True)
    lm.save(strict=True, verbose=verbose)
