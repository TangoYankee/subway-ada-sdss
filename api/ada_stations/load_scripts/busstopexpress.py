from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from ..models import BusStopExpress

# Auto-generated `LayerMapping` dictionary for BusStopExpress model
busstopexpress_mapping = {
    'stop_id': 'stop_id',
    'stop_name': 'stop_name',
    'stop_lat': 'stop_lat',
    'stop_lon': 'stop_lon',
    'geoid': 'GEOID',
    'namelsad': 'NAMELSAD',
    'geom': 'POINT',
}

busstopexpress_shp = Path(__file__).resolve().parent.parent / 'data' / 'express_bus_stops_nyc_nov2020'/ 'express_bus_stops_nyc_nov2020.shp'

def run(verbose=True):
    lm = LayerMapping(BusStopExpress, busstopexpress_shp, busstopexpress_mapping, transform=True)
    lm.save(strict=True, verbose=verbose)
