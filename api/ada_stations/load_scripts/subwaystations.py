from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from ..models import SubwayStation

subwaystation_mapping = {
    'name': 'name',
    'lines': 'lines',
    'complex_id': 'complex_id',
    'gtfs_stop_id': 'gtfs_stop_id',
    'ada_status_code': 'ada_status_code',
    'ridership': 'ridership',
    'ada_neighbor_gap': 'ada_neighbor_gap',
    'betweenness_centrality': 'betweenness_centrality',
    'geom': 'POINT',
}

subwaystation_geojson = (
    Path(__file__).resolve().parent.parent / "data" / "subway_stations.geojson"
)


def run(verbose=True):
    lm = LayerMapping(
        SubwayStation, subwaystation_geojson, subwaystation_mapping, transform=False
    )
    lm.save(strict=True, verbose=verbose)
