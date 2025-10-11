import { createContext, useContext } from "react";
import type { UnoCardConfig } from "@/types";

export type UnoCardEditorContextType = {
  size: string;
  cards: UnoCardConfig[];
  selectedCard: UnoCardConfig | null;
  setCards: (cards: UnoCardConfig[]) => void;
  setSize: (size: string) => void;
  setSelectedCard: (card: UnoCardConfig | null) => void;
  setCardConfig: (card: UnoCardConfig) => void;
  exportCard: (id: string) => void;
};

export const UnoCardEditorContext = createContext<UnoCardEditorContextType>({
  size: "200px",
  cards: [],
  selectedCard: null,
  setCards: () => {},
  setSize: () => {},
  setSelectedCard: () => {},
  setCardConfig: () => {},
  exportCard: () => {},
});

export function useUnoCardEditorContext() {
  return useContext(UnoCardEditorContext);
}
