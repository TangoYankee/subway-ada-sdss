import { Flex, Heading } from "@chakra-ui/react"

export const SearchPanel = ({shouldDisplay}: { shouldDisplay: boolean}) => {
    return (<Flex
      h="100%"
      w="100%"
      display={shouldDisplay ? "flex" : "none"}
      direction="column"
      padding="10px"
      overflow="scroll"
    ><Heading as='h2'>City Search</Heading>
    </Flex>);
};
