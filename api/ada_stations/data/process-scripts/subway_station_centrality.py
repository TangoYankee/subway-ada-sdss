import geopandas as gpd
import pandas as pd
import networkx as nx

stations_read = gpd.read_file("./subway_station_accessibility.geojson")
stations = stations_read.reindex(["complex_id", "line", "geometry"], axis=1)

station_lines = stations["line"]
unique_station_lines = set()
for line in station_lines:
    lines = line.split("-")
    for line in lines:
        unique_station_lines.add(line)

stations_on_lines = {}
for unique_line in unique_station_lines:
    stations_on_line = stations[stations.line.str.contains(unique_line)]
    stations_on_lines[unique_line] = stations_on_line

network_connections = {}
for unique_line, _stations in stations_on_lines.items():
    line_connections = {}
    for index, station in _stations.iterrows():
        station_complex_id = station.complex_id
        neighbor_stations = _stations.drop([index])
        station_df = _stations[_stations.complex_id == station_complex_id]

        nearest_neighbor = gpd.sjoin_nearest(station_df, neighbor_stations)
        nearest_neighbor_index = nearest_neighbor.iloc[0, 3]
        nearest_neighbor_id = nearest_neighbor.iloc[0, 4]

        further_neighbor_stations = neighbor_stations.drop([nearest_neighbor_index])
        second_nearest_neighbor = gpd.sjoin_nearest(
            station_df, further_neighbor_stations
        )
        second_nearest_neighbor_id = second_nearest_neighbor.iloc[0, 4]

        line_connections[station_complex_id] = [
            nearest_neighbor_id,
            second_nearest_neighbor_id,
        ]

    network_connections[unique_line] = line_connections

unique_edges = set()
for _stations in network_connections.values():
    for station, neighbors in _stations.items():
        for neighbor in neighbors:
            edge = tuple(sorted([station, neighbor]))
            if edge not in unique_edges:
                neighbors_neighbors = _stations[neighbor]
                if station in neighbors_neighbors:
                    unique_edges.add(edge)

edges = list(unique_edges)

subway_graph = nx.Graph()
subway_graph.add_edges_from(edges)
subway_centrality = nx.betweenness_centrality(subway_graph)

subway_centrality_df = pd.DataFrame({
    "complex_id": subway_centrality.keys(),
    "centrality": subway_centrality.values(),
})

subway_centrality_df.to_csv("subway_station_centrality.csv")
