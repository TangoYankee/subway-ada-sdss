import { Flex, Heading } from "@chakra-ui/react";
import { LayerCard } from "./LayerCard";
import { useContext } from "react";
import { ContentPanelsContext } from "../context/ContentPanelsContext";
import { ContentPanels } from "../types.d";
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
import { LayerContext } from "../context/LayerContext";

export const ContentPanel = () => {
  const { contentPanel } = useContext(ContentPanelsContext);

  return (
    <Flex
      h="635px"
      w="350px"
      position="absolute"
      top="83px"
      left="6px"
      zIndex="1"
      display={contentPanel === ContentPanels.Map ? "none" : "flex"}
    >
      <AboutPanel shouldDisplay={contentPanel === ContentPanels.About} />
      <DataPanel shouldDisplay={contentPanel === ContentPanels.Data} />
      <ResultsPanel shouldDisplay={contentPanel === ContentPanels.Results} />
    </Flex>
  );
};

const AboutPanel = ({ shouldDisplay }: { shouldDisplay: boolean }) => (
  <Flex
    h="100%"
    w="100%"
    bg="gray.100"
    display={shouldDisplay ? "flex" : "none"}
    direction="column"
    padding="10px"
  >
    <Heading>About</Heading>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt obcaecati
      doloribus asperiores natus, vitae nobis sapiente, quod perspiciatis
      aspernatur quas, beatae ipsum blanditiis voluptates quia suscipit animi
      maiores inventore esse.
    </p>
  </Flex>
);

const DataPanel = ({ shouldDisplay }: { shouldDisplay: boolean }) => {
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

const ResultsPanel = ({ shouldDisplay }: { shouldDisplay: boolean }) => (
  <Flex
    h="100%"
    w="100%"
    bg="gray.100"
    display={shouldDisplay ? "flex" : "none"}
    direction="column"
    padding="10px"
  >
    <Heading>Results</Heading>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt obcaecati
      doloribus asperiores natus, vitae nobis sapiente, quod perspiciatis
      aspernatur quas, beatae ipsum blanditiis voluptates quia suscipit animi
      maiores inventore esse.
    </p>
  </Flex>
);
