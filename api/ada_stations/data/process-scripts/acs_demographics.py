import geopandas as gpd
from shapely.geometry.polygon import Polygon
from shapely.geometry.multipolygon import MultiPolygon

nyc_tracts = gpd.read_file("nyc_2020_tracts_shoreline/nyct2020.shp")
age_sex = gpd.read_file("nyc_acs_2020_age_sex.csv")
poverty = gpd.read_file("nyc_acs_2020_poverty.csv")
disability = gpd.read_file("nyc_acs_2020_disability.csv")

demographics = gpd.GeoDataFrame(
    [
        map(lambda x: x.split("US")[1], age_sex.GEO_ID),
        age_sex.S0101_C01_001E,
        age_sex.S0101_C01_002E,
        age_sex.S0101_C01_030E,
        poverty.S1701_C01_001E,
        poverty.S1701_C01_003E,
        poverty.S1701_C01_010E,
        disability.S1810_C01_048E,
        disability.S1810_C01_049E,
        disability.S1810_C01_052E,
    ]
).transpose()


demographics.columns = [
    "GEOID",
    "total",
    "under_5",
    "65_and_over",
    "poverty_total",
    "poverty_under_5",
    "poverty_65_and_over",
    "under_18_ambulatory",
    "over_18_under_65_ambulatory",
    "65_and_over_ambulatory",
]

nyc_geoids = nyc_tracts.reindex(["GEOID", "geometry"], axis=1)
nyc_geoids = nyc_geoids.to_crs(4326)
nyc_geoids["geometry"] = [
    MultiPolygon([feature]) if isinstance(feature, Polygon) else feature
    for feature in nyc_geoids["geometry"]
]

demographic_tracts = nyc_geoids.join(demographics.set_index("GEOID"), on="GEOID")

demographic_tracts.to_file("tract_demographics_acs_2020.geojson", driver="GeoJSON")
