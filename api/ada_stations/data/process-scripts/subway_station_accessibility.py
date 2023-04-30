import geopandas as gpd

stations = gpd.read_file("subway_stations_marked.csv")

ada_status = stations.ada_status
ada_unique = set()
for ada in ada_status:
    ada_unique.add(ada)

ada_codes = [None] * len(ada_status)
ada_code_map = {
    "Full ADA Access": 0,
    "Partial ADA Access northbound only": 1,
    "Partial ADA Access Southbound Only": 1,
    "Partial ADA Acccess southbound only": 1,
    "Partial ADA Access soutbound only": 1,
    "ADA Access Under Construction": 2,
    "No Access - Under Consideration": 3,
    "No Access - No Plans for Funding": 4,
}
for index, status in enumerate(ada_status):
    ada_codes[index] = ada_code_map[status]

stations["ada_status_code"] = ada_codes

stations.lon = [lon[2:] for lon in stations.lon]
stations.lat = [lat[:-1] for lat in stations.lat]

stations = gpd.GeoDataFrame(
    stations, geometry=gpd.points_from_xy(stations.lon, stations.lat)
)
stations = stations.drop(columns=["ada_status", "lon", "lat"])

stations.to_file("subway_station_accessibility.geojson", driver="GeoJSON")
