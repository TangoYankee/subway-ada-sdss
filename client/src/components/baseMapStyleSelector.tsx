import { Flex, FormControl, FormLabel, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface BaseMapStyleSelectorProps {
    setBaseMapStyle: Dispatch<SetStateAction<'basic' | 'hybrid'>>
}
export const BaseMapStyleSelector = ({setBaseMapStyle}: BaseMapStyleSelectorProps) => {
    return (
        <Flex position="absolute" top={4} right={20} zIndex="1" bg="whiteAlpha.900" p={1}>
        <FormControl>
            <FormLabel as='legend' htmlFor={null}>
                Select base map style
            </FormLabel>
            <RadioGroup defaultValue="basic" onChange={(value) => setBaseMapStyle(value as 'basic' | 'hybrid')}>
                <HStack spacing={2}>
                    <Radio value="basic">Basic</Radio>
                    <Radio value="hybrid">Satellite</Radio>
                </HStack>
            </RadioGroup>
        </FormControl>
        </Flex>
    );
}