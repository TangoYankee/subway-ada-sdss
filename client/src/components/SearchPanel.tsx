import {Box, Flex, Heading, Input } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react";
import { getGeoSearchResults } from "../helpers/utils";
import debounce from 'lodash.debounce';

export const SearchPanel = ({shouldDisplay}: { shouldDisplay: boolean}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    
    const onChangeSearchTerm = async (e: ChangeEvent<HTMLInputElement>)=> {
        const _value = e.target.value
        setSearchTerm(_value);
        debounce(async ()=>{
            const _searchResults = await getGeoSearchResults(_value);
            setSearchResults(_searchResults);
        }, 500);
    }

    return (<Flex
      h="100%"
      w="100%"
      display={shouldDisplay ? "flex" : "none"}
      direction="column"
      padding="10px"
      overflow="scroll"
    ><Heading as='h2'>City Search</Heading>
    <Box padding={2}>
        <Input placeholder="Search for a place in the city" size="lg" value={searchTerm} onChange={onChangeSearchTerm}></Input>
    </Box>
    </Flex>);
};
