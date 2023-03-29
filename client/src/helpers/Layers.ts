export const busRoutesSourceId = "bus-routes";
export const busRoutesLayerId = busRoutesSourceId;
export const busRouteLayerStyle = {
  id: busRoutesLayerId,
  source: busRoutesSourceId,
  type: "line" as const,
  paint: {
    "line-color": ["get", "color"] as unknown,
    "line-opacity": 0.5,
  },
};

export const busStopSourceId = "bus-stops";
export const busStopLayerId = busStopSourceId;
export const busStopLayerStyle = {
  id: busStopLayerId,
  source: busStopSourceId,
  type: "circle" as const,
  paint: {
    "circle-color": "#1A202C",
    "circle-radius": 1.5,
    "circle-opacity": 0.5,
  },
};

export const busRoutesExpressSourceId = "bus-routes-express";
export const busRoutesExpressLayerId = busRoutesExpressSourceId;
export const busRouteExpressLayerStyle = {
  id: busRoutesExpressLayerId,
  source: busRoutesExpressSourceId,
  type: "line" as const,
  paint: {
    "line-color": ["get", "color"] as unknown,
    "line-opacity": 0.5,
  },
};

export const busStopsExpressSourceId = "bus-stops-express";
export const busStopsExpressLayerId = busStopsExpressSourceId;
export const busStopExpressLayerStyle = {
  id: busStopsExpressLayerId,
  source: busStopsExpressSourceId,
  type: "circle" as const,
  paint: {
    "circle-color": "#00933C",
    "circle-radius": 2,
    "circle-opacity": 0.75,
  },
};

export const hospitalsSourceId = "hospitals";
export const hospitalsLayerId = hospitalsSourceId;
export const hospitalsLayerStyle = {
  id: hospitalsLayerId,
  source: hospitalsSourceId,
  type: "circle" as const,
  paint: {
    "circle-color": "#E53E3E",
    "circle-radius": 3,
    "circle-opacity": 0.75,
  },
};

export const parksSourceId = "parks";
export const parksLayerId = parksSourceId;
export const parksLayerStyle = {
  id: parksLayerId,
  source: parksSourceId,
  type: "fill" as const,
  paint: {
    "fill-color": "#25855A",
    "fill-outline-color": "#E2E8F0",
    "fill-opacity": 0.5,
  },
};

export const schoolsSourceId = "schools";
export const schoolsLayerId = schoolsSourceId;
export const schoolsLayerStyle = {
  id: schoolsLayerId,
  source: schoolsSourceId,
  type: "circle" as const,
  paint: {
    "circle-color": "#ECC94B",
    "circle-radius": 3,
    "circle-opacity": 0.75,
  },
};

export const subwayRoutesSourceId = "subway-routes";
export const subwayRoutesLayerId = subwayRoutesSourceId;
export const subwayRoutesLayerStyle = {
  id: subwayRoutesLayerId,
  source: subwayRoutesSourceId,
  type: "line" as const,
  paint: {
    "line-color": ["get", "color"] as unknown,
    "line-opacity": 0.75,
  },
};

export const subwayStationsSourceId = "subway-stations";
export const subwayStationLayerId = subwayStationsSourceId;
export const subwayStationLayerStyle = {
  id: subwayStationLayerId,
  source: subwayStationsSourceId,
  type: "circle" as const,
  paint: {
    "circle-color": "#222834",
    "circle-radius": 3.5,
    "circle-opacity": 0.75,
  },
};
