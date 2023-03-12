import geopandas as gpd

stations = gpd.read_file("subway_station_ridership.csv")

stations = gpd.GeoDataFrame(
    stations, geometry=gpd.points_from_xy(stations.stop_lon, stations.stop_lat)
)

stations = stations.reindex(
    ["complex_id", "complex_nm", "trains", "station_ct", "tot2019", "geometry"], axis=1
)

stations.to_file("subway_stations_2019.geojson", driver="GeoJSON")
