from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from ..models import Hospital

hospital_mapping = {
    "facility_type": "Facility_Type",
    "facility_name": "Facility_Name",
    "geom": "POINT",
}

hospital_geojson = (
    Path(__file__).resolve().parent.parent / "data" / "hospitals_2011.geojson"
)


def run(verbose=True):
    lm = LayerMapping(Hospital, hospital_geojson, hospital_mapping, transform=False)
    lm.save(strict=True, verbose=verbose)
