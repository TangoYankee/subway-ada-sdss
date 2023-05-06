import { Point } from "@types/geojson";

export type Result = {
  id: string;
  rank: number;
  score: number;
};

export enum ContentPanels {
  Map = "MAP",
  About = "ABOUT",
  CitySearch = "CITY_SEARCH",
  Data = "DATA",
  Results = "RESULTS",
  SelectedStationDetails = "SELECTED_STATION_DETAILS",
}

export type FactorWeighting = {
  id: string;
  shouldWeight: boolean;
  weight: number;
};

export type FactorWeightings = Record<string, FactorWeighting> | null;

export type Ranking = {
  complex_id: string;
  name: string;
  lines: string;
  ada_status_code: number;
  score: number;
  ranking: number;
  batch: number;
  parks: number;
  schools: number;
  hospitals: number;
  bus_stops: number;
  bus_stops_express: number;
};

export type ComplexID = string;

export type SubwayStationAdaProperties = {
  name: string;
  lines: string;
  complex_id: string;
  gtfs_stop_id: string;
  ada_status_code: number;
  betweenness_centrality: string;
  ada_neighbor_gap: string;
  ridership: number;
};

export type TractProperties = {
  geoid: string;
  total: number;
  under_five: number;
  sixty_five_and_over: number;
  poverty_total: number;
  poverty_under_five: number;
  poverty_sixty_five_and_over: number;
  under_eighteen_ambulatory: number;
  over_eighteen_under_sixty_five_ambulatory: number;
  sixty_five_and_over_ambulatory: number;
};

export type BusStopProperties = {
  stop_name: string;
  namelsad: string;
};

export type BusStopExpress = {
  stop_name: string;
  namelsad: string;
};

export type HospitalProperties = {
  facility_type: string;
  facility_name: string;
};

export type ParkProperties = {
  signname: string;
  acres: string;
  location: string;
  waterfront: string;
  typecategory: string;
};

export type School = {
  location_name: string;
  location_type_description: string;
  location_category_description: string;
  primary_address_line_1: string;
};

export type SubwayStationAdaGeoProperties = SubwayStationAdaProperties & {
  lat: number;
  lng: number;
};
export type SubwayStationAdaMap = Record<
  ComplexID,
  SubwayStationAdaGeoProperties
>;

export type SubwayStationAda = {
  id: number;
  type: "Feature";
  geometry: Point;
  properties: SubwayStationAdaProperties;
};

export type SubwayStationAdaFeatures = Array<SubwayStationAda>;

export type SubwayStationAdaCollection = {
  type: "FeatureCollection";
  features: SubwayStationAdaFeatures;
};

export type Rankings = Record<string, Ranking> | null;

export type Feature<T, U> = {
  type: "Feature";
  geometry: T;
  properties: U;
};

export type GeoSearchProperties = {
  id: string;
  name: string;
  neighbourhood: string;
  borough: string;
  label: string;
};

export type GeoSearchFeature = Feature<Point, GeoSearchProperties>;
export type GeoSearchFeatures = Array<GeoSearchFeature>;

export type GeoSearchResults = {
  features: GeoSearchFeatures;
};

export type GeoCoords = {
  lat: number;
  lng: number;
};
