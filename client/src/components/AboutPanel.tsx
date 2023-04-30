import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Stack,
  StackDivider,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

export const AboutPanel = ({ shouldDisplay }: { shouldDisplay: boolean }) => (
  <Flex
    h="100%"
    w="100%"
    display={shouldDisplay ? "flex" : "none"}
    direction="column"
    padding={2.5}
  >
    <Heading as="h2" p="2">
      About
    </Heading>
    <Flex overflow="scroll">
      <Card>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="md">Background</Heading>
              <Text p="1">
                The NYC MTA subway systems includes around 490 stations. As of
                2020, only about 120 of these stations meet Americans with
                Disabilities Act standards for accessibility. The MTA plans to
                make 95% of stations accessible by 2055. However, it is
                impractical to upgrade all of these stations simultaneously.
                Instead, the stations are selected in batches for upgrades.
              </Text>
              <Text p="1">
                Selecting stations for inclusion in each batch of upgrades is
                incredibly complex. Additionally, excluding a station from an
                upgrade batch will impact the community it serves for years. To
                aid in the selection of stations, the MTA consults the Advisory
                Committee for Transit Accessibility (ACTA). The ACTA collects
                feedback from riders and community members and shares it with
                the MTA. Together, the ACTA and MTA develop criteria to select
                stations for accessibility upgrades.
              </Text>
              <Text p="1">
                This Spatial Decision Support System allows for the exploration
                of different ranking criteria. It has collected data related the
                characteristics of the stations, the amenities close to each
                station, and the demographics of the population which each
                station serves. Follow the instructions below to start ranking
                stations.
              </Text>
            </Box>
            <Box>
              <Heading size="md">Instructions</Heading>
              <OrderedList>
                <ListItem>Navigate to the &quot;Factors&quot; Panel</ListItem>
                <ListItem>
                  Scroll through the factors and adjust their relative weights
                </ListItem>
                <ListItem>
                  Uncheck any factors that should be excluded from consideration
                </ListItem>
                <ListItem>
                  Click the &quot;Rank Stations&quot; button to generate a
                  rankings
                </ListItem>
                <ListItem>
                  Navigate to the &quot;Rankings&quot; Panel to view and
                  download the rankings
                </ListItem>
              </OrderedList>
            </Box>
            <Box>
              <Heading size="md">Tips</Heading>
              <UnorderedList>
                <ListItem>
                  Only stations that are &quot;under consideration&quot; or have
                  &quot;no upcoming plans&quot; are ranked. Fully and partially
                  accessible, as well as stations actively being upgraded, are
                  excluded.
                </ListItem>
                <ListItem>
                  It is possible to explore multiple weighting combinations to
                  see how they change the rankings. However, the
                  &quot;Rankings&quot; page is not updated with the new criteria
                  until after clicking &quot;Rank Stations&quot;.
                </ListItem>
                <ListItem>
                  Clicking a station on the map will display a popup. However,
                  The &quot;Subway Station ADA Status&quot; layer needs to be
                  displayed for this to function.
                </ListItem>
              </UnorderedList>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  </Flex>
);
