from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from .models import BusRoutes

# Auto-generated `LayerMapping` dictionary for BusRoutes model
busroutes_mapping = {
    'route_id': 'route_id',
    'route_dir': 'route_dir',
    'route_shor': 'route_shor',
    'route_long': 'route_long',
    'color': 'color',
    'geom': 'MULTILINESTRING',
}

busroutes_shp = Path(__file__).resolve().parent / 'data' / 'bus_routes_nyc_nov2020'/ 'bus_routes_nyc_nov2020.shp'

def run(verbose=True):
    lm = LayerMapping(BusRoutes, busroutes_shp, busroutes_mapping, transform=False)
    lm.save(strict=True, verbose=verbose)
