import geopandas as gpd

stations_read = gpd.read_file("./subway_station_accessibility.geojson")
stations = stations_read.reindex(["complex_id", "line", "geometry"], axis=1)

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

print(stations_on_lines)