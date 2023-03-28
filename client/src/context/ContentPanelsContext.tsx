import { createContext } from "react";
import { ContentPanels } from "../types.d";

export const ContentPanelsContext = createContext({
  contentPanel: ContentPanels.Map,
  setContentPanel: (panel: ContentPanels) => {},
});
