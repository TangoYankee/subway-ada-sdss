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

export type Rankings = Record<string, Ranking> | null;
