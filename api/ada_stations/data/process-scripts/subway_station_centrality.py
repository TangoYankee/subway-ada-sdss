import geopandas as gpd

stations_read = gpd.read_file("./subway_station_accessibility.geojson")
stations = stations_read.reindex(["complex_id", "line", "geometry"], axis=1)[0:25]

station_lines = stations['line']
unique_station_lines = set()
for line in station_lines:
    lines = line.split('-')
    for line in lines:
        unique_station_lines.add(line)

stations_on_lines = {}
for unique_line in unique_station_lines:
    stations_on_line = stations[stations.line.str.contains(unique_line)]
    stations_on_lines[unique_line] = stations_on_line

station_connections = {}
for unique_line, _stations in stations_on_lines.items():
    for index, _complex_id in enumerate(_stations['complex_id']):
        station = _stations[_stations.complex_id == _complex_id]
        neighbor_stations = _stations[_stations.complex_id != _complex_id]

        nearest_neighbor_joined = gpd.sjoin_nearest(station, neighbor_stations)
        nearest_right = nearest_neighbor_joined['complex_id_right']
        if(len(nearest_right) == 1):
            for nearest_neighbor_id in nearest_right:
                print(f'nearest: {nearest_neighbor_id}')
                further_neighbor_stations = neighbor_stations[neighbor_stations.complex_id != nearest_neighbor_id]
                second_nearest_neighbor_joined = gpd.sjoin_nearest(station, further_neighbor_stations)
                second_nearest_right = second_nearest_neighbor_joined['complex_id_right']
                if(len(second_nearest_right) == 1):
                    for second_nearest_neighbor_id in second_nearest_right:
                        print(f'second nearest: {second_nearest_neighbor_id}')
            
        # print(nearest_neighbor_joined['complex_id_right'])
        # print(f'second nearest: {second_nearest_neighbor_id}')

        # print(len(station['complex_id']))
        # print(len(neighbor_stations['complex_id']))
        # print(len(_stations['complex_id']))
