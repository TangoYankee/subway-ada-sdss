import geopandas as gpd

nyc_tracts = gpd.read_file("nyc_2020_tracts_shoreline/nyct2020.shp")
age_sex = gpd.read_file("nyc_acs_2020_age_sex.csv")
poverty = gpd.read_file("nyc_acs_2020_poverty.csv")
disability = gpd.read_file("nyc_acs_2020_disability.csv")

print(nyc_tracts.head())
print(age_sex.head())
print(poverty.head())
print(disability.head())
