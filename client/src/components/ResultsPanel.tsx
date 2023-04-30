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
import { useContext, useEffect, useState } from "react";
import { RankingsContext } from "../context/RankingsContext";
import { DownloadRankingsBtn } from "./DownloadRankingsBtn";
import { Ranking } from "../types";

const getActivePhase = (
  rankings: Record<string, Ranking> | null,
  complexId: string
) =>
  rankings !== null && rankings[complexId] !== undefined
    ? rankings[complexId].batch
    : -1;

export const ResultsPanel = ({ shouldDisplay }: { shouldDisplay: boolean }) => {
  const { rankings, complexId } = useContext(RankingsContext);
  const [accordionIndex, setAccordionIndex] = useState(
    getActivePhase(rankings, complexId)
  );

  useEffect(() => {
    const activePhase = getActivePhase(rankings, complexId);
    if (activePhase !== -1) setAccordionIndex(activePhase);
  }, [rankings, complexId]);

  const toggleAccordionIndex = (index: number) => {
    const _accordionIndex = index === accordionIndex ? -1 : index;
    setAccordionIndex(_accordionIndex);
  };

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
      <Flex justifyContent="space-around" alignItems="center">
        <Heading as="h2">Results</Heading>
        <DownloadRankingsBtn />
      </Flex>
      {rankings !== null ? (
        <Accordion allowToggle index={accordionIndex}>
          {batchedRankings.map((batch, index) => (
            <PhaseAccordionItem
              rankings={batch}
              key={index}
              toggleAccordionIndex={() => toggleAccordionIndex(index)}
            />
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
  toggleAccordionIndex: () => void;
}
const PhaseAccordionItem = ({
  rankings,
  toggleAccordionIndex,
}: PhaseAccordionItemProps) => {
  const { complexId, setComplexId } = useContext(RankingsContext);

  const phaseRankings = rankings.map((result, i) => (
    <Card
      key={`${result.complex_id}-${i}`}
      backgroundColor={result.complex_id === complexId ? "orange.100" : ""}
      borderWidth={result.complex_id === complexId ? "2px" : ""}
      borderStyle={result.complex_id === complexId ? "solid" : ""}
      borderColor={result.complex_id === complexId ? "orange.600" : ""}
    >
      <CardBody
        p="1"
        textAlign="left"
        onClick={() => setComplexId(result.complex_id)}
      >
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
        <AccordionButton onClick={toggleAccordionIndex}>
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
