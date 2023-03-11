from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from ..models import Park

park_mapping = {
    "acres": "acres",
    "location": "location",
    "signname": "signname",
    "typecategory": "typecategory",
    "waterfront": "waterfront",
    "geom": "MULTIPOLYGON",
}

park_geojson = Path(__file__).resolve().parent.parent / "data" / "parks_2023.geojson"


def run(verbose=True):
    lm = LayerMapping(Park, park_geojson, park_mapping, transform=False)
    lm.save(strict=True, verbose=verbose)
