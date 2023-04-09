import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Flex,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  StackDivider,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { ChangeEvent, useContext, useState } from "react";
import { RankingsContext } from "../context/RankingsContext";
import { GROUPED_FACTORS } from "../helpers/constants";
import { RankStationBtn } from "./RankStationBtn";

interface FactorPanelProps {
  shouldDisplay: boolean;
}
export const FactorPanel = ({ shouldDisplay }: FactorPanelProps) => {
  const factorGroups = Object.entries(GROUPED_FACTORS).map(
    ([groupName, factors]) => (
      <FactorGroup key={groupName} groupName={groupName} factors={factors} />
    )
  );
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
        <RankStationBtn />
      </Flex>
      <Flex direction="column" overflow="scroll">
        {factorGroups}
      </Flex>
    </Flex>
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
      <Heading size="xs">{factor}</Heading>
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
    </Box>
  ));
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{groupName}</Heading>
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
