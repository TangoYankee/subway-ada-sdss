import geopandas as gpd

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

station_factor_totals = {factor: [] for factor in count_factors_files.keys()}
## TODO: add tracts_demo factors with empty arrays to station factors
tracts_demos = tracts.drop(columns=["GEOID", "geometry"])
for index, station_geometry in enumerate(stations.geometry):
    station_buffer = station_geometry.buffer(BUFFER)
    for factor, data in count_factors_data.items():
        station_factor_totals[factor].append(
            len(data.sindex.query(station_buffer, predicate="intersects"))
        )
    tracts_demo_in_buffer = tracts_demos.sindex.query(
        station_buffer, predicate="intersection"
    )

    for factor in tracts_demo_in_buffer:
        ## TODO: accumulate demographic totals among all tracts in station buffer.
        ## Then append count to station_factors
        # factor_totals = station_factor_totals.get(factor, [None]*len(stations.geometry))
        # factor_totals[index] = factor_totals[index] +
        pass

        pass
for factor, totals in station_factor_totals.items():
    stations[factor] = totals

# print(stations.head())
tracts_demos = tracts.drop(columns=["GEOID", "geometry"])
# print(tracts[0])
for column in tracts_demos:
    for data in tracts[column]:
        print(data)
#     for column in tracts_demos:
#         print(tract[column].sum())
# tracts_in_buffer = tracts.sindex.query(station_buffer, predicate="intersects")
# schools_in_buffer = len(schools.sindex.query(station_buffer, predicate="intersects"))
# print(schools_in_buffer)
# # tracts_within_buffer = tracts.query(geometry.intersects(station_buffer), engine="python")
# # print(tracts.geometry[0].distance( stations.geometry[0] ))
# # tract.distance()
