import geopandas as gpd

entrances = gpd.read_file("subway_entrances_may2016/subway_entrances_may2016.shp")

entrances = gpd.GeoDataFrame(
    entrances, geometry=gpd.points_from_xy(entrances.Longitude, entrances.Latitude)
)

entrances = entrances.drop(
    columns=[
        "Division",
        "Station_La",
        "Station_Lo",
        "North_Sout",
        "East_West_",
        "Vending",
        "Staffing",
        "Staff_Hour",
        "Latitude",
        "Longitude",
        "GEOID",
        "NAMELSAD",
    ]
)

entrances.to_file("subway_entrances_may2016.geojson", driver="GeoJSON")
