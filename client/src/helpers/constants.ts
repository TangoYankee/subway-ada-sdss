import { FactorWeightings } from "../types";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN ?? "localhost:8001";
export const API_BASE_URL = `http://${API_DOMAIN}`;

export const FACTORS = {
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

export const GROUPED_FACTORS = {
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

console.log(defaultFactorWeights);

export const DEFAULT_FACTOR_WEIGHTS: FactorWeightings = defaultFactorWeights;
