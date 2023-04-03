import {
  Box,
  Card,
  CardBody,
  Checkbox,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useMap } from "react-map-gl";

interface LayerCardProps {
  addToLoadedSources: () => void;
  isSourceLoaded: boolean;
  layerId: string;
  children: React.ReactNode;
}

const DEFAULT_WEIGHT = 50;
export const LayerCard = ({
  children,
  addToLoadedSources,
  isSourceLoaded,
  layerId,
}: LayerCardProps) => {
  const { sdssMap } = useMap();
  const [sliderValue, setSliderValue] = useState(DEFAULT_WEIGHT);
  const [showTooltip, setShowTooltip] = useState(false);

  const setIncludeData = () => {
    null;
  };

  const setLayerVisibility = (e: ChangeEvent<HTMLInputElement>) => {
    const map = sdssMap.getMap();
    const isChecked = e.target.checked;
    if (isChecked) {
      if (!isSourceLoaded) {
        addToLoadedSources();
      } else {
        map.setLayoutProperty(layerId, "visibility", "visible");
      }
    } else {
      if (!isChecked && isSourceLoaded) {
        map.setLayoutProperty(layerId, "visibility", "none");
      }
    }
  };

  return (
    <Card>
      <CardBody>
        <Flex direction="column">
          {children}
          <Flex>
            <Flex direction="column" flex={1}>
              <Checkbox onChange={setIncludeData}>Weighting</Checkbox>
              <Box width="90%">
                <Slider
                  defaultValue={DEFAULT_WEIGHT}
                  min={0}
                  max={100}
                  onChange={setSliderValue}
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
                    label={`${sliderValue / 100}`}
                  >
                    <SliderThumb />
                  </Tooltip>
                </Slider>
              </Box>
            </Flex>
            <Flex direction="column" flex={1}>
              <Checkbox
                onChange={setLayerVisibility}
                defaultChecked={isSourceLoaded}
              >
                Display
              </Checkbox>
              <Text>Symbols TBD</Text>
            </Flex>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};
