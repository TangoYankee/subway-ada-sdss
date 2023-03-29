import { Flex, Heading } from "@chakra-ui/react";

export const ResultsPanel = ({ shouldDisplay }: { shouldDisplay: boolean }) => (
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
