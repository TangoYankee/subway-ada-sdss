import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Flex,
  Heading,
  Skeleton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  StackDivider,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useMap } from "react-map-gl";
import { RankingsContext } from "../context/RankingsContext";
import {
  FACTOR_DISPLAY,
  GROUPED_FACTORS,
  NON_FACTORS,
} from "../helpers/constants";
import {
  LAYERS,
  LAYER_DEFAULT_VISIBILITY,
  LAYER_VISIBILITY_STATE,
} from "../helpers/MapLayers";
import { RankStationBtn } from "./RankStationBtn";

interface FactorPanelProps {
  shouldDisplay: boolean;
}
export const FactorPanel = ({ shouldDisplay }: FactorPanelProps) => {
  const { sdssMap } = useMap();
  const [layersAreLoaded, setLayersAreLoaded] = useState(false);
  const factorGroups = Object.entries(GROUPED_FACTORS).map(
    ([groupName, factors]) => (
      <FactorGroup key={groupName} groupName={groupName} factors={factors} />
    )
  );

  useEffect(() => {
    if (sdssMap) {
      sdssMap.on("load", () => {
        setLayersAreLoaded(true);
      });
    }
  }, [sdssMap]);

  return (
    <Flex
      h="100%"
      w="100%"
      direction="column"
      display={shouldDisplay ? "flex" : "none"}
    >
      <Flex justifyContent="space-around" alignItems="center">
        <Heading size="lg" padding={2.5}>
          Factors
        </Heading>
        <Skeleton isLoaded={layersAreLoaded}>
          <RankStationBtn />
        </Skeleton>
      </Flex>
      <Flex direction="column" overflow="scroll">
        <Skeleton isLoaded={layersAreLoaded}>
          <NetworkContextLayers />
          {factorGroups}
        </Skeleton>
      </Flex>
    </Flex>
  );
};

const NetworkContextLayers = () => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Subway Network Context</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />}>
          <Heading size="xs">Subway Station ADA Status</Heading>
          <FactorDisplayControl
            factor={NON_FACTORS.ADA_STATUS_CODE}
          ></FactorDisplayControl>
          <Heading size="xs">Subway Lines</Heading>
          <FactorDisplayControl
            factor={NON_FACTORS.ROUTE_LINE_COLOR}
          ></FactorDisplayControl>
        </Stack>
      </CardBody>
    </Card>
  );
};

interface FactorGroupProps {
  groupName: string;
  factors: Array<string>;
}
const FactorGroup = ({ groupName, factors }: FactorGroupProps) => {
  const { factorWeights, updateFactorWeight, updateShouldWeight } =
    useContext(RankingsContext);
  const factorControls = factors.map((factor) => (
    <Box key={factor}>
      <Heading size="xs">{FACTOR_DISPLAY[factor]}</Heading>
      <Flex>
        <Flex direction="column" flex={1}>
          <FactorWeightControl
            shouldWeight={factorWeights[factor].shouldWeight}
            updateShouldWeight={(shouldWeight: boolean) =>
              updateShouldWeight(factorWeights[factor].id, shouldWeight)
            }
            weight={factorWeights[factor].weight}
            updateWeight={(weight: number) =>
              updateFactorWeight(factorWeights[factor].id, weight)
            }
          />
        </Flex>
        <Flex direction="column" flex={1}>
          <FactorDisplayControl factor={factor} />
        </Flex>
      </Flex>
    </Box>
  ));
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{groupName.replace("_", " ")}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />}>{factorControls}</Stack>
      </CardBody>
    </Card>
  );
};

interface FactorWeightControlProps {
  shouldWeight: boolean;
  updateShouldWeight: (shouldWeight: boolean) => void;
  weight: number;
  updateWeight: (weight: number) => void;
}
const FactorWeightControl = ({
  shouldWeight,
  updateShouldWeight,
  weight,
  updateWeight,
}: FactorWeightControlProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const setShouldWeight = (e: ChangeEvent<HTMLInputElement>) =>
    updateShouldWeight(e.target.checked);
  return (
    <>
      <Checkbox onChange={setShouldWeight} isChecked={shouldWeight}>
        <Text fontSize="sm">Weighting</Text>
      </Checkbox>
      <Box width="90%">
        <Slider
          value={weight}
          min={1}
          max={100}
          isDisabled={!shouldWeight}
          onChange={updateWeight}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            placement="top"
            isOpen={showTooltip}
            label={`${weight / 100}`}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
      </Box>
    </>
  );
};

interface FactorDisplayControlProps {
  factor: string;
  direction?: "column" | "row";
}

const FactorDisplayControl = ({
  factor,
  direction = "column",
}: FactorDisplayControlProps) => {
  const { sdssMap } = useMap();
  const layerId = LAYERS[factor].LAYER_ID;
  const [layerVisibility, setLayerVisibility] = useState(
    LAYER_DEFAULT_VISIBILITY[layerId] === LAYER_VISIBILITY_STATE.VISIBLE
  );

  const updateLayerVisibility = (e: ChangeEvent<HTMLInputElement>) => {
    const map = sdssMap.getMap();
    const isChecked = e.target.checked;
    isChecked
      ? map.setLayoutProperty(
          layerId,
          "visibility",
          LAYER_VISIBILITY_STATE.VISIBLE
        )
      : map.setLayoutProperty(
          layerId,
          "visibility",
          LAYER_VISIBILITY_STATE.HIDDEN
        );
    setLayerVisibility(isChecked);
  };

  return (
    <Flex direction={direction} flex={1}>
      <Checkbox onChange={updateLayerVisibility} isChecked={layerVisibility}>
        Display
      </Checkbox>
      <Text>Symbols TBD</Text>
    </Flex>
  );
};
