import geopandas as gpd

stations = gpd.read_file("../subway_station_accessibility.geojson")
station_ridership = gpd.read_file("../subway_stations_2019.geojson")

## Distance at which available ridership data is matched with a station
MAX_DISTANCE = 6.4e-4
nearest_station_query = station_ridership.sindex.nearest(
    geometry=stations.geometry,
    return_all=False,
    return_distance=True,
)


nearest_station_indexes = nearest_station_query[0][1]
nearest_station_distance = nearest_station_query[1]
riderships = [None] * len(nearest_station_indexes)
for index, nearest_station_index in enumerate(nearest_station_indexes):
    riderships[index] = (
        int(station_ridership.loc[nearest_station_index, "tot2019"])
        if (nearest_station_distance[index] <= MAX_DISTANCE)
        else None
    )

stations["ridership_2019"] = riderships
