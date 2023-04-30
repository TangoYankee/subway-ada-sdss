import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { RankingsContext } from "../context/RankingsContext";
import { json2csv } from "json-2-csv";

export const DownloadRankingsBtn = () => {
  const { rankings } = useContext(RankingsContext);

  const downloadRankings = async () => {
    const csv = await json2csv(Object.values(rankings));
    const exportData = "data:text/csv;charset=utf-8," + csv;
    window.open(encodeURI(exportData));
  };

  return (
    <Button variant="outline" colorScheme="blue" onClick={downloadRankings} isDisabled={!rankings}>
      Download Rankings
    </Button>
  );
};
