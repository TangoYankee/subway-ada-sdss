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

export type Ranking = {
  id: string;
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
