import { LayerCard } from "./LayerCard";
import { LayerContext } from "../context/LayerContext";
import { useContext } from "react";
import { Flex } from "@chakra-ui/react";
import {
  busRoutesExpressLayerId,
  busRoutesExpressSourceId,
  busRoutesLayerId,
  busRoutesSourceId,
  busStopLayerId,
  busStopsExpressLayerId,
  busStopsExpressSourceId,
  busStopSourceId,
  hospitalsLayerId,
  hospitalsSourceId,
  parksLayerId,
  parksSourceId,
  schoolsLayerId,
  schoolsSourceId,
  subwayRoutesLayerId,
  subwayRoutesSourceId,
  subwayStationLayerId,
  subwayStationsSourceId,
} from "../helpers/Layers";
export const DataPanel = ({ shouldDisplay }: { shouldDisplay: boolean }) => {
  const { loadedSources, addToLoadedSources } = useContext(LayerContext);
  return (
    <Flex
      h="100%"
      w="100%"
      direction="column"
      overflow="scroll"
      display={shouldDisplay ? "flex" : "none"}
    >
      <LayerCard
        layerId={subwayStationLayerId}
        isSourceLoaded={loadedSources.has(subwayStationsSourceId)}
        addToLoadedSources={() => addToLoadedSources(subwayStationsSourceId)}
      >
        Subway Stations
      </LayerCard>
      <LayerCard
        layerId={subwayRoutesLayerId}
        isSourceLoaded={loadedSources.has(subwayRoutesSourceId)}
        addToLoadedSources={() => addToLoadedSources(subwayRoutesSourceId)}
      >
        Subway Routes
      </LayerCard>
      <LayerCard
        layerId={hospitalsLayerId}
        isSourceLoaded={loadedSources.has(hospitalsSourceId)}
        addToLoadedSources={() => addToLoadedSources(hospitalsSourceId)}
      >
        Hospitals
      </LayerCard>
      <LayerCard
        layerId={parksLayerId}
        isSourceLoaded={loadedSources.has(parksSourceId)}
        addToLoadedSources={() => addToLoadedSources(parksSourceId)}
      >
        Parks
      </LayerCard>
      <LayerCard
        layerId={schoolsLayerId}
        isSourceLoaded={loadedSources.has(schoolsSourceId)}
        addToLoadedSources={() => addToLoadedSources(schoolsSourceId)}
      >
        Schools
      </LayerCard>
      <LayerCard
        layerId={busRoutesLayerId}
        isSourceLoaded={loadedSources.has(busRoutesSourceId)}
        addToLoadedSources={() => addToLoadedSources(busRoutesSourceId)}
      >
        Bus Routes
      </LayerCard>
      <LayerCard
        layerId={busStopLayerId}
        isSourceLoaded={loadedSources.has(busStopSourceId)}
        addToLoadedSources={() => addToLoadedSources(busStopSourceId)}
      >
        Bus Stops
      </LayerCard>
      <LayerCard
        layerId={busRoutesExpressLayerId}
        addToLoadedSources={() => addToLoadedSources(busRoutesExpressSourceId)}
        isSourceLoaded={loadedSources.has(busRoutesExpressSourceId)}
      >
        Express Bus Routes
      </LayerCard>
      <LayerCard
        layerId={busStopsExpressLayerId}
        addToLoadedSources={() => addToLoadedSources(busStopsExpressSourceId)}
        isSourceLoaded={loadedSources.has(busStopsExpressSourceId)}
      >
        Express Bus Stops
      </LayerCard>
    </Flex>
  );
};
