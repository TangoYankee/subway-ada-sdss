import { Box } from "@chakra-ui/react";
import { MapProvider } from "react-map-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useState } from "react";
import cloneDeep from "lodash.clonedeep";
import { ContentPanel } from "../components/ContentPanel";
import {
  subwayRoutesSourceId,
  subwayStationsSourceId,
} from "../helpers/Layers";
import { LayerContext } from "../context/LayerContext";
import { ADAMap } from "../components/ADAMap";

const MapPage = () => {
  const [loadedSources, setLoadedSources] = useState<Set<string>>(
    new Set([subwayStationsSourceId, subwayRoutesSourceId])
  );

  const addToLoadedSources = (source: string) => {
    const _loadedSources = cloneDeep(loadedSources);
    _loadedSources.add(source);
    setLoadedSources(_loadedSources);
  };

  return (
    <Box height="100%" flex="1">
      <MapProvider>
        <LayerContext.Provider
          value={{
            loadedSources,
            addToLoadedSources,
          }}
        >
          <ContentPanel />
          <ADAMap />
        </LayerContext.Provider>
      </MapProvider>
    </Box>
  );
};

export default MapPage;
