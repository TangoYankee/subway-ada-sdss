import { Flex } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { ContentPanelsContext } from "../context/ContentPanelsContext";
import { ContentPanels } from "../types.d";

export const ContentPanel = () => { 
    const {contentPanel} = useContext( ContentPanelsContext )
    useEffect(() => {
        console.log('panel', contentPanel);
    }, [contentPanel])

    return  <Flex
    h="635px"
    w="350px"
    position="absolute"
    top="83px"
    left="6px"
    zIndex="1"
    borderStyle="solid"
    borderWidth="10px"
    // display={contentPanel === ContentPanels.Map ? 'none' : 'flex'}
  ></Flex>
 };

const Panel = () => {
    const {contentPanel} = useContext( ContentPanelsContext )
    switch(contentPanel) {
        case ContentPanels.About: {
            return <div>About</div>
        }
        case ContentPanels.Data: {
            return <div>Data</div>
        }
        case ContentPanels.Results: {
            return <div>Results</div>
        }
    }
}