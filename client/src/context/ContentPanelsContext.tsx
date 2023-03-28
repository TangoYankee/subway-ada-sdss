import { createContext } from "react";
import { ContentPanels } from "../types.d";

export type ContentPanelsContextType = {
  contentPanel: ContentPanels;
  setContentPanel: (panel: ContentPanels) => void;
};

export const ContentPanelsContext = createContext<ContentPanelsContextType>({
  contentPanel: ContentPanels.Map,
  setContentPanel: () => {},
});
