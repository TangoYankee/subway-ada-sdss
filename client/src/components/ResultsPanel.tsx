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
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { RankingsContext } from "../context/RankingsContext";
import { Ranking } from "../types";

export const ResultsPanel = ({ shouldDisplay }: { shouldDisplay: boolean }) => {
  const { rankings } = useContext(RankingsContext);

  const batchedRankings: Array<Array<Ranking>> =
    rankings === null
      ? []
      : Object.values(rankings)
          .reduce(
            (batchedRankings: Array<Array<Ranking>>, ranking: Ranking) => {
              const rankingBatch = ranking.batch;
              const batch: Array<Ranking> | undefined =
                batchedRankings[rankingBatch];
              batchedRankings[rankingBatch] =
                batch === undefined ? [ranking] : batch.concat(ranking);
              return batchedRankings;
            },
            []
          )
          .map((batch) => batch.sort((a, b) => a.ranking - b.ranking));

  return (
    <Flex
      h="100%"
      w="100%"
      display={shouldDisplay ? "flex" : "none"}
      direction="column"
      padding="10px"
      overflow="scroll"
    >
      <Heading as="h2">Results</Heading>
      {rankings !== null ? (
        <Accordion allowToggle>
          {batchedRankings.map((batch, index) => (
            <PhaseAccordionItem rankings={batch} key={index} />
          ))}
        </Accordion>
      ) : (
        <Text>No rankings available. Please run a rankings analysis</Text>
      )}
    </Flex>
  );
};

interface PhaseAccordionItemProps {
  rankings: Array<Ranking>;
}

const PhaseAccordionItem = ({ rankings }: PhaseAccordionItemProps) => {
  const phaseRankings = rankings.map((result, i) => (
    <Card key={`${result.id}-${i}`}>
      <CardBody p="1" textAlign="left">
        <Text>
          {result.name} for the {result.lines} line
          {result.lines.split("-").length > 1 ? "s" : ""}
        </Text>
        <Text>
          Score {result.score.toFixed(2)}, Rank {result.ranking}
        </Text>
      </CardBody>
    </Card>
  ));

  return (
    <AccordionItem>
      <h3>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Phase {rankings[0].batch + 1}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h3>
      <AccordionPanel p={1} maxHeight="40vh" overflow="scroll">
        {phaseRankings}
      </AccordionPanel>
    </AccordionItem>
  );
};
