import geopandas as gpd

# Amenities and demographics
BUFFER = 0.005
count_factors_files = {
    "schools": "schools_20192020.geojson",
    "parks": "parks_2023.geojson",
    "hospitals": "hospitals_2011.geojson",
    "bus_stops": "bus_stops_nyc_nov2020/bus_stops_nyc_nov2020.shp",
    "bus_stops_express": "express_bus_stops_nyc_nov2020",
}
stations = gpd.read_file("../subway_station_accessibility.geojson")
tracts = gpd.read_file("../tract_demographics_acs_2020.geojson")
count_factors_data = {factor: None for factor in count_factors_files.keys()}

for factor_name, factor_file in count_factors_files.items():
    count_factors_data[factor_name] = gpd.read_file(f"../{factor_file}").to_crs(4326)

tracts_demos = tracts.drop(columns=["GEOID", "geometry"])
tract_factors = [factor for factor in tracts_demos]
factors = list(count_factors_files.keys()) + tract_factors
stations_totals = {factor: [] for factor in factors}
for index, station_geometry in enumerate(stations.geometry):
    station_buffer = station_geometry.buffer(BUFFER)
    for factor, data in count_factors_data.items():
        stations_totals[factor].append(
            len(data.sindex.query(station_buffer, predicate="intersects"))
        )
    tracts_in_buffer = tracts.sindex.query(station_buffer, predicate="intersects")
    station_tract_totals = {factor: 0 for factor in tract_factors}
    for tract_index in tracts_in_buffer:
        tract = tracts_demos.iloc[tract_index]
        for factor in tract_factors:
            station_tract_totals[factor] += int(tract[factor])
    for factor, total in station_tract_totals.items():
        stations_totals[factor].append(total)

for factor, totals in stations_totals.items():
    stations[factor] = totals

# Station ridership
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

stations.to_file("subway_stations_500_buffer.geojson", driver="GeoJSON")
