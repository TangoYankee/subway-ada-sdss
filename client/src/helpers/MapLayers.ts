import { FACTORS, NON_FACTORS } from "./constants";

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
  [SOURCE_ID.SUBWAY_STATIONS]: "subway-stations",
  [SOURCE_ID.SUBWAY_ROUTES]: "subway-routes",
  [SOURCE_ID.PARKS]: "parks",
  [SOURCE_ID.SCHOOLS]: "schools",
  [SOURCE_ID.HOSPITALS]: "hospitals",
  [SOURCE_ID.BUS_STOPS]: "bus-stops",
  [SOURCE_ID.BUS_STOPS_EXPRESS]: "bus-stops-express",
  [SOURCE_ID.TRACTS]: "tract-demographics",
};

export const LAYER_ID = {
  SUBWAY_STATION_ADA_CODE: "subway_station_ada_code_layer",
  SUBWAY_STATION_ADA_NEIGHBOR_GAP: "subway_station_ada_neighbor_gap_layer",
  SUBWAY_STATION_BETWEENNESS_CENTRALITY:
    "subway_station_betweenness_centrality",
  SUBWAY_STATION_RIDERSHIP: "subway_station_ridership_layer",
  SUBWAY_ROUTE_LINE_COLOR: "subway_station_line_color_layer",
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

export enum LAYER_VISIBILITY_STATE {
  VISIBLE = "visible",
  HIDDEN = "none",
}

export const LAYER_DEFAULT_VISIBILITY = {
  [LAYER_ID.SUBWAY_STATION_ADA_CODE]: LAYER_VISIBILITY_STATE.VISIBLE,
  [LAYER_ID.SUBWAY_STATION_ADA_NEIGHBOR_GAP]: LAYER_VISIBILITY_STATE.HIDDEN,
  [LAYER_ID.SUBWAY_STATION_BETWEENNESS_CENTRALITY]:
    LAYER_VISIBILITY_STATE.HIDDEN,
  [LAYER_ID.SUBWAY_STATION_RIDERSHIP]: LAYER_VISIBILITY_STATE.HIDDEN,
  [LAYER_ID.SUBWAY_ROUTE_LINE_COLOR]: LAYER_VISIBILITY_STATE.VISIBLE,
  [LAYER_ID.PARKS]: LAYER_VISIBILITY_STATE.HIDDEN,
  [LAYER_ID.SCHOOLS]: LAYER_VISIBILITY_STATE.HIDDEN,
  [LAYER_ID.HOSPITALS]: LAYER_VISIBILITY_STATE.HIDDEN,
  [LAYER_ID.BUS_STOPS]: LAYER_VISIBILITY_STATE.HIDDEN,
  [LAYER_ID.BUS_STOPS_EXPRESS]: LAYER_VISIBILITY_STATE.HIDDEN,
  [LAYER_ID.TOTAL]: LAYER_VISIBILITY_STATE.VISIBLE,
  [LAYER_ID.UNDER_FIVE]: LAYER_VISIBILITY_STATE.HIDDEN,
  [LAYER_ID.SIXTY_FIVE_AND_OVER]: LAYER_VISIBILITY_STATE.HIDDEN,
  [LAYER_ID.POVERTY_TOTAL]: LAYER_VISIBILITY_STATE.HIDDEN,
  [LAYER_ID.POVERTY_UNDER_FIVE]: LAYER_VISIBILITY_STATE.HIDDEN,
  [LAYER_ID.POVERTY_SIXTY_FIVE_AND_OVER]: LAYER_VISIBILITY_STATE.HIDDEN,
  [LAYER_ID.UNDER_EIGHTEEN_AMBULATORY]: LAYER_VISIBILITY_STATE.HIDDEN,
  [LAYER_ID.OVER_EIGHTEEN_UNDER_SIXTY_FIVE_AMBULATORY]:
    LAYER_VISIBILITY_STATE.HIDDEN,
  [LAYER_ID.OVER_EIGHTEEN_UNDER_SIXTY_FIVE_AMBULATORY]:
    LAYER_VISIBILITY_STATE.HIDDEN,
  [LAYER_ID.SIXTY_FIVE_AND_OVER_AMBULATORY]: LAYER_VISIBILITY_STATE.HIDDEN,
};

export const LAYER_PAINT = {
  [LAYER_ID.SUBWAY_STATION_ADA_CODE]: {
    type: "circle" as const,
    paint: {
      "circle-color": {
        property: "ada_status_code",
        stops: [
          [0, "#2c7bb6"],
          [1, "#abd9e9"],
          [2, "#ffffbf"],
          [3, "#fdae61"],
          [4, "#d7191c"],
        ],
      },
      "circle-stroke-color": "#F6E05E",
      "circle-stroke-width": [
        "case",
        ["boolean", ["feature-state", "highlight"], false],
        2,
        0,
      ] as unknown,
      "circle-radius": 3.5,
      "circle-opacity": 0.75,
    },
  },
  [LAYER_ID.SUBWAY_STATION_ADA_NEIGHBOR_GAP]: {
    type: "circle" as const,
    paint: {
      "circle-radius": 3,
      "circle-opacity": 0.75,
      "circle-stroke-color": "#222222",
      "circle-stroke-width": 0.5,
    },
  },
  [LAYER_ID.SUBWAY_STATION_BETWEENNESS_CENTRALITY]: {
    type: "circle" as const,
    paint: {
      "circle-radius": 3,
      "circle-opacity": 0.75,
      "circle-stroke-color": "#222222",
      "circle-stroke-width": 0.5,
    },
  },
  [LAYER_ID.SUBWAY_STATION_RIDERSHIP]: {
    type: "circle" as const,
    paint: {
      "circle-radius": 3,
      "circle-opacity": 1,
      "circle-stroke-color": "#222222",
      "circle-stroke-width": 0.5,
    },
  },
  [LAYER_ID.SUBWAY_ROUTE_LINE_COLOR]: {
    type: "line" as const,
    paint: {
      "line-color": ["get", "color"] as unknown,
      "line-opacity": 0.75,
    },
  },
  [LAYER_ID.PARKS]: {
    type: "fill" as const,
    paint: {
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "highlight"], false],
        "#F6E05E",
        "#25855A",
      ] as unknown,
    },
  },
  [LAYER_ID.SCHOOLS]: {
    type: "circle" as const,
    paint: {
      "circle-color": "#222222",
      "circle-radius": 3,
      "circle-opacity": 0.75,
      "circle-stroke-color": "#F6E05E",
      "circle-stroke-width": [
        "case",
        ["boolean", ["feature-state", "highlight"], false],
        2,
        0,
      ] as unknown,
    },
  },
  [LAYER_ID.HOSPITALS]: {
    type: "circle" as const,
    paint: {
      "circle-color": "#E53E3E",
      "circle-radius": 3,
      "circle-opacity": 0.75,
      "circle-stroke-color": "#F6E05E",
      "circle-stroke-width": [
        "case",
        ["boolean", ["feature-state", "highlight"], false],
        2,
        0,
      ] as unknown,
    },
  },
  [LAYER_ID.BUS_STOPS]: {
    type: "circle" as const,
    paint: {
      "circle-color": "#1A202C",
      "circle-radius": 2,
      "circle-opacity": 0.5,
      "circle-stroke-color": "#F6E05E",
      "circle-stroke-width": [
        "case",
        ["boolean", ["feature-state", "highlight"], false],
        2,
        0,
      ] as unknown,
    },
  },
  [LAYER_ID.BUS_STOPS_EXPRESS]: {
    type: "circle" as const,
    paint: {
      "circle-color": "#00933C",
      "circle-radius": 2,
      "circle-opacity": 0.75,
      "circle-stroke-color": "#F6E05E",
      "circle-stroke-width": [
        "case",
        ["boolean", ["feature-state", "highlight"], false],
        2,
        0,
      ] as unknown,
    },
  },
  [LAYER_ID.TOTAL]: {
    type: "fill" as const,
    visibility: "none",
    paint: {
      "fill-color": [
        "step",
        ["get", FACTORS.TOTAL],
        "#edf8fb",
        5,
        "#b2e2e2",
        1000,
        "#66c2a4",
        3000,
        "#2ca25f",
        7000,
        "#006d2c",
      ] as unknown,
      "fill-outline-color": "#222222",
      "fill-opacity": 0.5,
    },
  },
  [LAYER_ID.UNDER_FIVE]: {
    type: "fill" as const,
    paint: {
      "fill-color": [
        "step",
        ["get", FACTORS.UNDER_FIVE],
        "#edf8fb",
        5,
        "#b3cde3",
        100,
        "#8c96c6",
        300,
        "#8856a7",
        600,
        "#810f7c",
      ] as unknown,
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
    },
  },
  [LAYER_ID.SIXTY_FIVE_AND_OVER]: {
    type: "fill" as const,
    paint: {
      "fill-color": [
        "step",
        ["get", FACTORS.SIXTY_FIVE_AND_OVER],
        "#f0f9e8",
        5,
        "#bae4bc",
        300,
        "#7bccc4",
        750,
        "#43a2ca",
        1500,
        "#0868ac",
      ] as unknown,
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
    },
  },
  [LAYER_ID.POVERTY_TOTAL]: {
    type: "fill" as const,
    paint: {
      "fill-color": [
        "step",
        ["get", FACTORS.POVERTY_TOTAL],
        "#fef0d9",
        5,
        "#fdcc8a",
        2000,
        "#fc8d59",
        5000,
        "#e34a33",
        8000,
        "#b30000",
      ] as unknown,
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
    },
  },
  [LAYER_ID.POVERTY_UNDER_FIVE]: {
    type: "fill" as const,
    paint: {
      "fill-color": [
        "step",
        ["get", FACTORS.POVERTY_UNDER_FIVE],
        "#f1eef6",
        5,
        "#bdc9e1",
        100,
        "#74a9cf",
        300,
        "#2b8cbe",
        700,
        "#045a8d",
      ] as unknown,
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
    },
  },
  [LAYER_ID.POVERTY_SIXTY_FIVE_AND_OVER]: {
    type: "fill" as const,
    paint: {
      "fill-color": [
        "step",
        ["get", FACTORS.POVERTY_SIXTY_FIVE_AND_OVER],
        "#f6eff7",
        5,
        "#bdc9e1",
        300,
        "#67a9cf",
        750,
        "#1c9099",
        1500,
        "#016c59",
      ] as unknown,
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
    },
  },
  [LAYER_ID.UNDER_EIGHTEEN_AMBULATORY]: {
    type: "fill" as const,
    paint: {
      "fill-color": [
        "step",
        ["get", FACTORS.UNDER_EIGHTEEN_AMBULATORY],
        "#f1eef6",
        5,
        "#d7b5d8",
        200,
        "#df65b0",
        500,
        "#dd1c77",
        1000,
        "#980043",
      ] as unknown,
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
    },
  },
  [LAYER_ID.OVER_EIGHTEEN_UNDER_SIXTY_FIVE_AMBULATORY]: {
    type: "fill" as const,
    paint: {
      "fill-color": [
        "step",
        ["get", FACTORS.OVER_EIGHTEEN_UNDER_SIXTY_FIVE_AMBULATORY],
        "#feebe2",
        5,
        "#fbb4b9",
        1500,
        "#f768a1",
        3000,
        "#c51b8a",
        5000,
        "#7a0177",
      ] as unknown,
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
    },
  },
  [LAYER_ID.SIXTY_FIVE_AND_OVER_AMBULATORY]: {
    type: "fill" as const,
    paint: {
      "fill-color": [
        "step",
        ["get", FACTORS.SIXTY_FIVE_AND_OVER_AMBULATORY],
        "#ffffb2",
        5,
        "#fecc5c",
        500,
        "#fd8d3c",
        1000,
        "#f03b20",
        1500,
        "#bd0026",
      ] as unknown,
      "fill-outline-color": "#E2E8F0",
      "fill-opacity": 0.5,
    },
  },
};

export const NON_FACTOR_LAYERS = {
  [NON_FACTORS.ADA_STATUS_CODE]: {
    SOURCE_ID: SOURCE_ID.SUBWAY_STATIONS,
    LAYER_ID: LAYER_ID.SUBWAY_STATION_ADA_CODE,
  },
  [NON_FACTORS.ROUTE_LINE_COLOR]: {
    SOURCE_ID: SOURCE_ID.SUBWAY_ROUTES,
    LAYER_ID: LAYER_ID.SUBWAY_ROUTE_LINE_COLOR,
  },
};

export const FACTOR_LAYERS = {
  [FACTORS.ADA_NEIGHBOR_GAP]: {
    SOURCE_ID: SOURCE_ID.SUBWAY_STATIONS,
    LAYER_ID: LAYER_ID.SUBWAY_STATION_ADA_NEIGHBOR_GAP,
  },
  [FACTORS.BETWEENNESS_CENTRALITY]: {
    SOURCE_ID: SOURCE_ID.SUBWAY_STATIONS,
    LAYER_ID: LAYER_ID.SUBWAY_STATION_BETWEENNESS_CENTRALITY,
  },
  [FACTORS.RIDERSHIP]: {
    SOURCE_ID: SOURCE_ID.SUBWAY_STATIONS,
    LAYER_ID: LAYER_ID.SUBWAY_STATION_RIDERSHIP,
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
  [FACTORS.POVERTY_TOTAL]: {
    SOURCE_ID: SOURCE_ID.TRACTS,
    LAYER_ID: LAYER_ID.POVERTY_TOTAL,
  },
  [FACTORS.POVERTY_UNDER_FIVE]: {
    SOURCE_ID: SOURCE_ID.TRACTS,
    LAYER_ID: LAYER_ID.POVERTY_UNDER_FIVE,
  },
  [FACTORS.POVERTY_SIXTY_FIVE_AND_OVER]: {
    SOURCE_ID: SOURCE_ID.TRACTS,
    LAYER_ID: LAYER_ID.POVERTY_SIXTY_FIVE_AND_OVER,
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
};

export const LAYERS = {
  ...FACTOR_LAYERS,
  ...NON_FACTOR_LAYERS,
};

export const SOURCED_LAYERS = Object.entries(LAYERS).reduce(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (sourcedFactors: Record<string, Array<string>>, [_factor, data]) => {
    const { SOURCE_ID: sourceId, LAYER_ID: layerId } = data;
    const layerIds = sourcedFactors[sourceId];
    sourcedFactors[sourceId] =
      layerIds === undefined ? [layerId] : layerIds.concat(layerId);

    return sourcedFactors;
  },
  {}
);

export const SOURCED_FACTORS = Object.entries(FACTOR_LAYERS).reduce(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (sourcedFactors: Record<string, Array<string>>, [_factor, data]) => {
    const { SOURCE_ID: sourceId, LAYER_ID: layerId } = data;
    const layerIds = sourcedFactors[sourceId];
    sourcedFactors[sourceId] =
      layerIds === undefined ? [layerId] : layerIds.concat(layerId);

    return sourcedFactors;
  },
  {}
);
