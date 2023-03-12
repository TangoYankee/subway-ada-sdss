from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from ..models import SubwayEntrance

subwayentrance_mapping = {
    "line": "Line",
    "station_name": "Station_Na",
    "route_1": "Route_1",
    "route_2": "Route_2",
    "route_3": "Route_3",
    "route_4": "Route_4",
    "route_5": "Route_5",
    "route_6": "Route_6",
    "route_7": "Route_7",
    "route_8": "Route_8",
    "route_9": "Route_9",
    "route_10": "Route_10",
    "route_11": "Route_11",
    "entrance_type": "Entrance_T",
    "entry": "Entry",
    "exit_only": "Exit_Only",
    "ada": "ADA",
    "ada_notes": "ADA_Notes",
    "free_cross": "Free_Cross",
    "corner": "Corner",
    "geom": "POINT",
}


subwayentrance_geojson = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "subway_entrances_may2016"
    / "subway_entrances_may2016.shp"
)


def run(verbose=True):
    lm = LayerMapping(
        SubwayEntrance, subwayentrance_geojson, subwayentrance_mapping, transform=True
    )
    lm.save(strict=True, verbose=verbose)
