from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from ..models import BusStop

# Auto-generated `LayerMapping` dictionary for BusStop model
busstop_mapping = {
    "stop_id": "stop_id",
    "stop_name": "stop_name",
    "stop_lat": "stop_lat",
    "stop_lon": "stop_lon",
    "geoid": "GEOID",
    "namelsad": "NAMELSAD",
    "geom": "POINT",
}

busstop_shp = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "bus_stops_nyc_nov2020"
    / "bus_stops_nyc_nov2020.shp"
)


def run(verbose=True):
    lm = LayerMapping(BusStop, busstop_shp, busstop_mapping, transform=True)
    lm.save(strict=True, verbose=verbose)
