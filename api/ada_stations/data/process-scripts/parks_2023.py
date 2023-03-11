import geopandas as gpd

parks = gpd.read_file("parks_full2023.geojson")
parks = parks.reindex(
    ["acres", "location", "signname", "typecategory", "waterfront", "geometry"], axis=1
)

parks.to_file("parks_2023.geojson", driver="GeoJSON")
