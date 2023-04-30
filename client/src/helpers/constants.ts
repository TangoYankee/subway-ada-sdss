import { FactorWeightings } from "../types";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN ?? "localhost:8001";
export const API_BASE_URL = `http://${API_DOMAIN}`;

export const NON_FACTORS = {
  ADA_STATUS_CODE: "ada_status_code",
  ROUTE_LINE_COLOR: "route_line_color",
};

export const FACTORS = {
  ADA_NEIGHBOR_GAP: "ada_neighbor_gap",
  BETWEENNESS_CENTRALITY: "betweenness_centrality",
  RIDERSHIP: "ridership",
  PARKS: "parks",
  SCHOOLS: "schools",
  HOSPITALS: "hospitals",
  BUS_STOPS: "bus_stops",
  BUS_STOPS_EXPRESS: "bus_stops_express",
  TOTAL: "total",
  UNDER_FIVE: "under_five",
  SIXTY_FIVE_AND_OVER: "sixty_five_and_over",
  POVERTY_TOTAL: "poverty_total",
  POVERTY_UNDER_FIVE: "poverty_under_five",
  POVERTY_SIXTY_FIVE_AND_OVER: "poverty_sixty_five_and_over",
  UNDER_EIGHTEEN_AMBULATORY: "under_eighteen_ambulatory",
  OVER_EIGHTEEN_UNDER_SIXTY_FIVE_AMBULATORY:
    "over_eighteen_under_sixty_five_ambulatory",
  SIXTY_FIVE_AND_OVER_AMBULATORY: "sixty_five_and_over_ambulatory",
};

export const FACTOR_DISPLAY = {
  [FACTORS.ADA_NEIGHBOR_GAP]: "Distance to nearest ADA station neighbor",
  [FACTORS.BETWEENNESS_CENTRALITY]: "Betweenness centrality",
  [FACTORS.RIDERSHIP]: "Ridership",
  [FACTORS.PARKS]: "Parks",
  [FACTORS.SCHOOLS]: "Schools",
  [FACTORS.HOSPITALS]: "Hospitals",
  [FACTORS.BUS_STOPS]: "Bus stops",
  [FACTORS.BUS_STOPS_EXPRESS]: "Bus stops, express",
  [FACTORS.TOTAL]: "Total population",
  [FACTORS.UNDER_FIVE]: "Population under five",
  [FACTORS.SIXTY_FIVE_AND_OVER]: "Population sixty five and over",
  [FACTORS.POVERTY_TOTAL]: "Total population in poverty",
  [FACTORS.POVERTY_UNDER_FIVE]: "Population under five in poverty",
  [FACTORS.POVERTY_SIXTY_FIVE_AND_OVER]: "Population sixty and over in poverty",
  [FACTORS.UNDER_EIGHTEEN_AMBULATORY]:
    "Population under 18 with ambulatory disabilities",
  [FACTORS.OVER_EIGHTEEN_UNDER_SIXTY_FIVE_AMBULATORY]:
    "Population over 18 and under 65 with ambulatory disabilities",
  [FACTORS.SIXTY_FIVE_AND_OVER_AMBULATORY]:
    "Population sixty five and over with ambulatory disabilities",
};

export const GROUPED_FACTORS = {
  Station_Traits: [
    FACTORS.ADA_NEIGHBOR_GAP,
    FACTORS.BETWEENNESS_CENTRALITY,
    FACTORS.RIDERSHIP,
  ],
  Amenities: [
    FACTORS.PARKS,
    FACTORS.SCHOOLS,
    FACTORS.HOSPITALS,
    FACTORS.BUS_STOPS,
    FACTORS.BUS_STOPS_EXPRESS,
  ],
  Demographics: [
    FACTORS.TOTAL,
    FACTORS.UNDER_FIVE,
    FACTORS.SIXTY_FIVE_AND_OVER,
    FACTORS.POVERTY_TOTAL,
    FACTORS.POVERTY_UNDER_FIVE,
    FACTORS.POVERTY_SIXTY_FIVE_AND_OVER,
    FACTORS.UNDER_EIGHTEEN_AMBULATORY,
    FACTORS.OVER_EIGHTEEN_UNDER_SIXTY_FIVE_AMBULATORY,
    FACTORS.SIXTY_FIVE_AND_OVER_AMBULATORY,
  ],
};

const defaultFactorWeights: FactorWeightings = {};
const factors = Object.values(GROUPED_FACTORS).reduce(
  (spreadFactors, groupedFactors) => spreadFactors.concat(groupedFactors)
);
factors.forEach((factor) => {
  defaultFactorWeights[factor] = {
    id: factor,
    shouldWeight: true,
    weight: 50,
  };
});

export const DEFAULT_FACTOR_WEIGHTS: FactorWeightings = defaultFactorWeights;
