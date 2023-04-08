import { FactorWeightings } from "../types";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN ?? "localhost:8001";
export const API_BASE_URL = `http://${API_DOMAIN}`;

const factors = [
  "parks",
  "schools",
  "hospitals",
  "bus_stops",
  "bus_stops_express",
];
const defaultFactorWeights: FactorWeightings = {};
factors.forEach((factor) => {
  defaultFactorWeights[factor] = {
    id: factor,
    shouldWeight: true,
    weight: 50,
  };
});

console.log("defaultFactorWeights", defaultFactorWeights);
export const DEFAULT_FACTOR_WEIGHTS: FactorWeightings = defaultFactorWeights;
