import geopandas as gpd

hospitals = gpd.read_file("hospitals_2011.csv")

hospital_count = len(hospitals)
latitudes = [None] * hospital_count
longitudes = [None] * hospital_count
for count, location in enumerate(hospitals.Location_1):
    lat, lon = location.split("\n")[2].split(",")
    latitudes[count] = float(lat.replace("(", ""))
    longitudes[count] = float(lon.replace(")", ""))

hospitals = gpd.GeoDataFrame(
    hospitals, geometry=gpd.points_from_xy(longitudes, latitudes)
)

hospitals = hospitals.reindex(["Facility_Type", "Facility_Name", "geometry"], axis=1)

hospitals.to_file("hospitals_2011.geojson", driver="GeoJSON")
