import { FACTORS } from "./constants";

export const SOURCE_ID = {
  SUBWAY_STATIONS: "subway_stations_source",
  SUBWAY_ROUTES: "subway_routes_source",
  PARKS: "parks_source",
  SCHOOLS: "schools_source",
  HOSPITALS: "hospitals_source",
  BUS_STOPS: "bus_stops_source",
  BUS_STOPS_EXPRESS: "bus_stops_express_source",
  TRACTS: "tracts_source",
};

export const SOURCE_ENDPOINT = {
  [SOURCE_ID.SUBWAY_STATIONS]: "subway-stations-ada",
  [SOURCE_ID.SUBWAY_ROUTES]: "subway-routes",
  [SOURCE_ID.PARKS]: "parks",
  [SOURCE_ID.SCHOOLS]: "schools",
  [SOURCE_ID.HOSPITALS]: "hospitals",
  [SOURCE_ID.BUS_STOPS]: "bus-stops",
  [SOURCE_ID.BUS_STOPS_EXPRESS]: "bus-stops-express",
  [SOURCE_ID.TRACTS]: "tract-demographics",
};

export const LAYER_ID = {
  SUBWAY_STATION_LOCATION: "subway_station_location",
  SUBWAY_ROUTE_LINE_COLOR: "subway_station_line_color",
  PARKS: "parks_layer",
  SCHOOLS: "schools_layer",
  HOSPITALS: "hospitals_layer",
  BUS_STOPS: "bus_stops_layer",
  BUS_STOPS_EXPRESS: "bus_stops_express_layer",
  TOTAL: "total_layer",
  UNDER_FIVE: "under_five_layer",
  SIXTY_FIVE_AND_OVER: "sixty_five_and_over_layer",
  POVERTY_TOTAL: "poverty_total_layer",
  POVERTY_UNDER_FIVE: "poverty_under_five_layer",
  POVERTY_SIXTY_FIVE_AND_OVER: "poverty_sixty_five_and_over_layer",
  UNDER_EIGHTEEN_AMBULATORY: "under_eighteen_ambulatory_layer",
  OVER_EIGHTEEN_UNDER_SIXTY_FIVE_AMBULATORY:
    "over_eighteen_under_sixty_five_ambulatory_layer",
  SIXTY_FIVE_AND_OVER_AMBULATORY: "sixty_five_and_over_ambulatory_layer",
};

export const LAYER_STYLE = {
  [LAYER_ID.SUBWAY_STATION_LOCATION]: {
    id: LAYER_ID.SUBWAY_STATION_LOCATION,
    source: SOURCE_ID.SUBWAY_STATIONS,
    type: "circle" as const,
    paint: {
      "circle-color": "#222834",
      "circle-radius": 3.5,
      "circle-opacity": 0.75,
    },
  },
  [LAYER_ID.SUBWAY_ROUTE_LINE_COLOR]: {
    id: LAYER_ID.SUBWAY_ROUTE_LINE_COLOR,
    source: SOURCE_ID.SUBWAY_ROUTES,
    type: "line" as const,
    paint: {
      "line-color": ["get", "color"] as unknown,
      "line-opacity": 0.75,
    },
  },
  [LAYER_ID.PARKS]: {
    id: LAYER_ID.PARKS,
    source: SOURCE_ID.PARKS,
    type: "fill" as const,
    paint: {
      "fill-color": "#25855A",
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
    },
  },
  [LAYER_ID.SCHOOLS]: {
    id: LAYER_ID.SCHOOLS,
    source: SOURCE_ID.SCHOOLS,
    type: "circle" as const,
    paint: {
      "circle-color": "#ECC94B",
      "circle-radius": 3,
      "circle-opacity": 0.75,
    },
  },
  [LAYER_ID.HOSPITALS]: {
    id: LAYER_ID.HOSPITALS,
    source: SOURCE_ID.HOSPITALS,
    type: "circle" as const,
    paint: {
      "circle-color": "#E53E3E",
      "circle-radius": 3,
      "circle-opacity": 0.75,
    },
  },
  [LAYER_ID.BUS_STOPS]: {
    id: LAYER_ID.BUS_STOPS,
    source: SOURCE_ID.BUS_STOPS,
    type: "circle" as const,
    paint: {
      "circle-color": "#1A202C",
      "circle-radius": 1.5,
      "circle-opacity": 0.5,
    },
  },
  [LAYER_ID.BUS_STOPS_EXPRESS]: {
    id: LAYER_ID.BUS_STOPS_EXPRESS,
    source: SOURCE_ID.BUS_STOPS_EXPRESS,
    type: "circle" as const,
    paint: {
      "circle-color": "#00933C",
      "circle-radius": 2,
      "circle-opacity": 0.75,
    },
  },
  [LAYER_ID.TOTAL]: {
    id: LAYER_ID.TOTAL,
    source: SOURCE_ID.TRACTS,
    type: "fill" as const,
    paint: {
      "fill-color": "#25855A",
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
    },
  },
  [LAYER_ID.UNDER_FIVE]: {
    id: LAYER_ID.UNDER_FIVE,
    source: SOURCE_ID.TRACTS,
    type: "fill" as const,
    paint: {
      "fill-color": "#E53E3E",
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
    },
  },
  [LAYER_ID.SIXTY_FIVE_AND_OVER]: {
    id: LAYER_ID.SIXTY_FIVE_AND_OVER,
    source: SOURCE_ID.TRACTS,
    type: "fill" as const,
    paint: {
      "fill-color": "#25855A",
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
    },
  },
  [LAYER_ID.POVERTY_TOTAL]: {
    id: LAYER_ID.POVERTY_TOTAL,
    source: SOURCE_ID.TRACTS,
    type: "fill" as const,
    paint: {
      "fill-color": "#25855A",
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
    },
  },
  [LAYER_ID.POVERTY_UNDER_FIVE]: {
    id: LAYER_ID.POVERTY_UNDER_FIVE,
    source: SOURCE_ID.TRACTS,
    type: "fill" as const,
    paint: {
      "fill-color": "#25855A",
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
    },
  },
  [LAYER_ID.POVERTY_SIXTY_FIVE_AND_OVER]: {
    id: LAYER_ID.POVERTY_SIXTY_FIVE_AND_OVER,
    source: SOURCE_ID.TRACTS,
    type: "fill" as const,
    paint: {
      "fill-color": "#25855A",
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
    },
  },
  [LAYER_ID.UNDER_EIGHTEEN_AMBULATORY]: {
    id: LAYER_ID.UNDER_EIGHTEEN_AMBULATORY,
    source: SOURCE_ID.TRACTS,
    type: "fill" as const,
    paint: {
      "fill-color": "#25855A",
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
    },
  },
  [LAYER_ID.OVER_EIGHTEEN_UNDER_SIXTY_FIVE_AMBULATORY]: {
    id: LAYER_ID.OVER_EIGHTEEN_UNDER_SIXTY_FIVE_AMBULATORY,
    source: SOURCE_ID.TRACTS,
    type: "fill" as const,
    paint: {
      "fill-color": "#25855A",
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
    },
  },
  [LAYER_ID.SIXTY_FIVE_AND_OVER_AMBULATORY]: {
    id: LAYER_ID.SIXTY_FIVE_AND_OVER_AMBULATORY,
    source: SOURCE_ID.TRACTS,
    type: "fill" as const,
    paint: {
      "fill-color": "#25855A",
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
    },
  },
};

export const FACTOR_LAYERS = {
  [FACTORS.PARKS]: {
    SOURCE_ID: SOURCE_ID.PARKS,
    LAYER_ID: LAYER_ID.PARKS,
  },
  [FACTORS.SCHOOLS]: {
    SOURCE_ID: SOURCE_ID.SCHOOLS,
    LAYER_ID: LAYER_ID.SCHOOLS,
  },
  [FACTORS.HOSPITALS]: {
    SOURCE_ID: SOURCE_ID.HOSPITALS,
    LAYER_ID: LAYER_ID.HOSPITALS,
  },
  [FACTORS.BUS_STOPS]: {
    SOURCE_ID: SOURCE_ID.BUS_STOPS,
    LAYER_ID: LAYER_ID.BUS_STOPS,
  },
  [FACTORS.BUS_STOPS_EXPRESS]: {
    SOURCE_ID: SOURCE_ID.BUS_STOPS_EXPRESS,
    LAYER_ID: LAYER_ID.BUS_STOPS_EXPRESS,
  },
  [FACTORS.TOTAL]: {
    SOURCE_ID: SOURCE_ID.TRACTS,
    LAYER_ID: LAYER_ID.TOTAL,
  },
  [FACTORS.UNDER_FIVE]: {
    SOURCE_ID: SOURCE_ID.TRACTS,
    LAYER_ID: LAYER_ID.UNDER_FIVE,
  },
  [FACTORS.SIXTY_FIVE_AND_OVER]: {
    SOURCE_ID: SOURCE_ID.TRACTS,
    LAYER_ID: LAYER_ID.SIXTY_FIVE_AND_OVER,
  },
  [FACTORS.UNDER_EIGHTEEN_AMBULATORY]: {
    SOURCE_ID: SOURCE_ID.TRACTS,
    LAYER_ID: LAYER_ID.UNDER_EIGHTEEN_AMBULATORY,
  },
  [FACTORS.OVER_EIGHTEEN_UNDER_SIXTY_FIVE_AMBULATORY]: {
    SOURCE_ID: SOURCE_ID.TRACTS,
    LAYER_ID: LAYER_ID.OVER_EIGHTEEN_UNDER_SIXTY_FIVE_AMBULATORY,
  },
  [FACTORS.SIXTY_FIVE_AND_OVER_AMBULATORY]: {
    SOURCE_ID: SOURCE_ID.TRACTS,
    LAYER_ID: LAYER_ID.SIXTY_FIVE_AND_OVER_AMBULATORY,
  },
};
