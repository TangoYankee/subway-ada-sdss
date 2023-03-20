from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from ..models import TractDemographic

tractdemographic_mapping = {
    'geoid': 'GEOID',
    'total': 'total',
    'under_five': 'under_5',
    'sixty_five_and_over': '65_and_over',
    'poverty_total': 'poverty_total',
    'poverty_under_five': 'poverty_under_5',
    'poverty_sixty_five_and_over': 'poverty_65_and_over',
    'under_eighteen_ambulatory': 'under_18_ambulatory',
    'over_eighteen_under_sixty_five_ambulatory': 'over_18_under_65_ambulatory',
    'sixty_five_and_over_ambulatory': '65_and_over_ambulatory',
    'geom': "MULTIPOLYGON",
}

tractdemographic_geojson = (
    Path(__file__).resolve().parent.parent / "data" / "tract_demographics_acs_2020.geojson"
)

def run(verbose=True):
    lm = LayerMapping(TractDemographic, tractdemographic_geojson, tractdemographic_mapping, transform=False)
    lm.save(strict=True, verbose=verbose)
