import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { DummyResults } from "../helpers/dummyData";

export const ResultsPanel = ({ shouldDisplay }: { shouldDisplay: boolean }) => (
  <Flex
    h="100%"
    w="100%"
    display={shouldDisplay ? "flex" : "none"}
    direction="column"
    padding="10px"
    bg="whiteAlpha.900"
    overflow="scroll"
  >
    <Heading as="h2">Results</Heading>
    <Accordion>
      <PhaseAccordionItem />
      <PhaseAccordionItem />
      <PhaseAccordionItem />
    </Accordion>
  </Flex>
);

const PhaseAccordionItem = () => {
  const Results = DummyResults.map((result, i) => (
    <Card key={`${result.id}-${i}`}>
      <CardBody p="1" textAlign="center">
        {result.id}: Score {result.score}, Rank {result.score}
      </CardBody>
    </Card>
  ));

  return (
    <AccordionItem>
      <h3>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Phase
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h3>
      <AccordionPanel p={1} maxHeight="40vh" overflow="scroll">
        {Results}
      </AccordionPanel>
    </AccordionItem>
  );
};
