import { Flex, Heading, Text } from "@chakra-ui/react";

export const AboutPanel = ({ shouldDisplay }: { shouldDisplay: boolean }) => (
  <Flex
    h="100%"
    w="100%"
    bg="whiteAlpha.900"
    display={shouldDisplay ? "flex" : "none"}
    direction="column"
    padding={2.5}
  >
    <Heading>About</Heading>
    <Text>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt obcaecati
      doloribus asperiores natus, vitae nobis sapiente, quod perspiciatis
      aspernatur quas, beatae ipsum blanditiis voluptates quia suscipit animi
      maiores inventore esse.
    </Text>
  </Flex>
);
