import { createContext, useContext } from "react";
import type { UnoCardConfig } from "@/types";

export type UnoCardEditorContextType = {
  size: number;
  cards: UnoCardConfig[];
  selectedCard: UnoCardConfig | null;
  setCards: (cards: UnoCardConfig[]) => void;
  setSize: (size: number) => void;
  setSelectedCard: (card: UnoCardConfig | null) => void;
  setCardConfig: (card: UnoCardConfig) => void;
  exportCard: (id: string) => void;
  exportAllCards: () => void;
};

export const UnoCardEditorContext = createContext<UnoCardEditorContextType>({
  size: 200,
  cards: [],
  selectedCard: null,
  setCards: () => {},
  setSize: () => {},
  setSelectedCard: () => {},
  setCardConfig: () => {},
  exportCard: () => {},
  exportAllCards: () => {},
});

export function useUnoCardEditorContext() {
  return useContext(UnoCardEditorContext);
}
