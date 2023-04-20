import { Point } from '@types/geojson';

export type Result = {
  id: string;
  rank: number;
  score: number;
};

export enum ContentPanels {
  Map = "MAP",
  About = "ABOUT",
  Data = "DATA",
  Results = "RESULTS",
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
    name: string,
    lines: string,
    complex_id: string,
    gtfs_stop_id: string,
    ada_status_code: number,
}

export type SubwayStationAdaGeoProperties = SubwayStationAdaProperties & {
  lat: number,
  lng: number
}
export type SubwayStationAdaMap = Record<ComplexID, SubwayStationAdaGeoProperties>;

export type SubwayStationAda = {
  id: number,
  type: "Feature",
  geometry: Point,
  properties: SubwayStationAdaProperties,
}

export type SubwayStationAdaFeatures = Array<SubwayStationAda>;
 
export type SubwayStationAdaCollection = {
  type: "FeatureCollection",
  features: SubwayStationAdaFeatures
}

export type Rankings = Record<string, Ranking> | null;
