from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from ..models import BusRouteExpress

# Auto-generated `LayerMapping` dictionary for BusRouteExpress model
busrouteexpress_mapping = {
    "route_id": "route_id",
    "route_dir": "route_dir",
    "route_shor": "route_shor",
    "route_long": "route_long",
    "color": "color",
    "geom": "MULTILINESTRING",
}

busrouteexpress_shp = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "express_bus_routes_nyc_nov2020"
    / "express_bus_routes_nyc_nov2020.shp"
)


def run(verbose=True):
    lm = LayerMapping(
        BusRouteExpress, busrouteexpress_shp, busrouteexpress_mapping, transform=True
    )
    lm.save(strict=True, verbose=verbose)
