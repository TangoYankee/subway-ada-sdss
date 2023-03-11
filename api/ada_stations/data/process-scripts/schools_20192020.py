import geopandas as gpd

schools = gpd.read_file("schools_20192020.csv")

schools = gpd.GeoDataFrame(schools, geometry=gpd.points_from_xy(schools.lon, schools.lat))
schools = schools.drop(columns=["lon", "lat"])

schools.to_file('schools_20192020.geojson', driver="GeoJSON")
