from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from ..models import School

school_mapping = {
    'system_code': 'system_code',
    'location_code': 'location_code',
    'location_name': 'location_name',
    'managed_by_name': 'Managed_by_name',
    'location_type_description': 'location_type_description',
    'location_category_description': 'Location_Category_Description',
    'status_descriptions': 'Status_descriptions',
    'primary_address_line_1': 'primary_address_line_1',
    'geom': 'POINT',
}

school_geojson = Path(__file__).resolve().parent.parent / 'data' / 'schools_20192020.geojson'

def run(verbose=True):
    lm = LayerMapping(School, school_geojson, school_mapping, transform=False)
    lm.save(strict=True, verbose=verbose)
