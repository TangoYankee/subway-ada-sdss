import { LayerCard } from "./LayerCard";
import { LayerContext } from "../context/LayerContext";
import { useContext } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import {
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
} from "../helpers/Layers";
import { RankStationBtn } from "./RankStationBtn";
import { RankingsContext } from "../context/RankingsContext";

export const DataPanel = ({ shouldDisplay }: { shouldDisplay: boolean }) => {
  const { factorWeights, updateFactorWeight, updateShouldWeight } =
    useContext(RankingsContext);
  const { loadedSources, addToLoadedSources } = useContext(LayerContext);
  return (
    <Flex
      h="100%"
      w="100%"
      direction="column"
      display={shouldDisplay ? "flex" : "none"}
    >
      <Flex justifyContent="space-around" alignItems="center">
        <Heading as="h2" padding={2.5}>
          Data
        </Heading>
        <RankStationBtn />
      </Flex>
      <Flex direction="column" overflow="scroll">
        <LayerCard
          layerId={hospitalsLayerId}
          shouldWeight={factorWeights["hospitals"].shouldWeight}
          weight={factorWeights["hospitals"].weight}
          updateShouldWeight={(shouldWeight: boolean) =>
            updateShouldWeight(factorWeights["hospitals"].id, shouldWeight)
          }
          updateWeight={(factorWeight: number) =>
            updateFactorWeight(factorWeights["hospitals"].id, factorWeight)
          }
          isSourceLoaded={loadedSources.has(hospitalsSourceId)}
          addToLoadedSources={() => addToLoadedSources(hospitalsSourceId)}
        >
          Hospitals
        </LayerCard>
        <LayerCard
          layerId={parksLayerId}
          shouldWeight={factorWeights["parks"].shouldWeight}
          weight={factorWeights["parks"].weight}
          updateShouldWeight={(shouldWeight: boolean) =>
            updateShouldWeight(factorWeights["parks"].id, shouldWeight)
          }
          updateWeight={(factorWeight: number) =>
            updateFactorWeight(factorWeights["parks"].id, factorWeight)
          }
          isSourceLoaded={loadedSources.has(parksSourceId)}
          addToLoadedSources={() => addToLoadedSources(parksSourceId)}
        >
          Parks
        </LayerCard>
        <LayerCard
          layerId={schoolsLayerId}
          shouldWeight={factorWeights["schools"].shouldWeight}
          weight={factorWeights["schools"].weight}
          updateShouldWeight={(shouldWeight: boolean) =>
            updateShouldWeight(factorWeights["schools"].id, shouldWeight)
          }
          updateWeight={(factorWeight: number) =>
            updateFactorWeight(factorWeights["schools"].id, factorWeight)
          }
          isSourceLoaded={loadedSources.has(schoolsSourceId)}
          addToLoadedSources={() => addToLoadedSources(schoolsSourceId)}
        >
          Schools
        </LayerCard>
        <LayerCard
          layerId={busStopLayerId}
          shouldWeight={factorWeights["bus_stops"].shouldWeight}
          weight={factorWeights["bus_stops"].weight}
          updateShouldWeight={(shouldWeight: boolean) =>
            updateShouldWeight(factorWeights["bus_stops"].id, shouldWeight)
          }
          updateWeight={(factorWeight: number) =>
            updateFactorWeight(factorWeights["bus_stops"].id, factorWeight)
          }
          isSourceLoaded={loadedSources.has(busStopSourceId)}
          addToLoadedSources={() => addToLoadedSources(busStopSourceId)}
        >
          Bus Stops
        </LayerCard>
        <LayerCard
          layerId={busStopsExpressLayerId}
          shouldWeight={factorWeights["bus_stops_express"].shouldWeight}
          weight={factorWeights["bus_stops_express"].weight}
          updateShouldWeight={(shouldWeight: boolean) =>
            updateShouldWeight(
              factorWeights["bus_stops_express"].id,
              shouldWeight
            )
          }
          updateWeight={(factorWeight: number) =>
            updateFactorWeight(
              factorWeights["bus_stops_express"].id,
              factorWeight
            )
          }
          addToLoadedSources={() => addToLoadedSources(busStopsExpressSourceId)}
          isSourceLoaded={loadedSources.has(busStopsExpressSourceId)}
        >
          Express Bus Stops
        </LayerCard>
      </Flex>
    </Flex>
  );
};
