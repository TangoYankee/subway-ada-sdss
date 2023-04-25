import {Box, Center, Flex, Heading, Input, Text } from "@chakra-ui/react"
import { ChangeEvent, useEffect, useState } from "react";
import { getGeoSearchResults } from "../helpers/utils";
import { useDebounce } from "use-debounce";
import { GeoSearchFeatures } from "../types";

export const SearchPanel = ({shouldDisplay}: { shouldDisplay: boolean}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<GeoSearchFeatures| null>(null);
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
    
    const onChangeSearchTerm = async (e: ChangeEvent<HTMLInputElement>)=> {
        const _value = e.target.value
        setSearchTerm(_value);
    }

    useEffect(() => {
        (async () => {
            if(debouncedSearchTerm !== '') {
                console.log("search term change");
                    console.log("make request");
                    const _searchResults = await getGeoSearchResults(debouncedSearchTerm);
                    const resultFeatues = _searchResults.features;
                    setSearchResults(resultFeatues);
            } else {
                setSearchResults(null);
            };
        })();
    }, [debouncedSearchTerm]);

    return (<Flex
      h="100%"
      w="100%"
      display={shouldDisplay ? "flex" : "none"}
      direction="column"
      padding="10px"
    ><Heading as='h2'>City Search</Heading>
    <Box padding={2}>
        <Input placeholder="Search for a place in the city" size="lg" value={searchTerm} onChange={onChangeSearchTerm}></Input>
        {
        searchResults !== null ? <Flex direction="column" padding={2} overflow="scroll" maxHeight="85%">
            {searchResults.map((result) => 
                <Flex key={result.properties.id} direction="column" padding={0.5} border="solid" borderStyle="solid" borderWidth={1} borderRadius="5">
                    <Text>{result.properties.name}</Text>
                    <Text>{result.properties.neighbourhood}, {result.properties.borough}</Text>
                </Flex>
            )}
        </Flex> : <Text>No Search Results</Text>
    }
    </Box>
    </Flex>);
};