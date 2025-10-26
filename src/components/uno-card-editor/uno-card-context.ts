import { createContext, useContext } from "react";
import type { UnoCardConfig } from "@/types";

export type UnoCardEditorContextType = {
  size: number;
  cards: UnoCardConfig[];
  selectedCard: UnoCardConfig | null;
  colors: {
    red: string;
    blue: string;
    green: string;
    yellow: string;
    black: string;
  };
  setCards: (cards: UnoCardConfig[]) => void;
  setSize: (size: number) => void;
  setSelectedCard: (card: UnoCardConfig | null) => void;
  setCardConfig: (card: UnoCardConfig) => void;
  exportCard: (id: string) => void;
  exportAllCards: () => void;
  setColor: (
    color: string,
    key: "red" | "blue" | "green" | "yellow" | "black"
  ) => void;
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
  colors: {
    red: "",
    blue: "",
    green: "",
    yellow: "",
    black: "",
  },
  setColor: () => {},
});

export function useUnoCardEditorContext() {
  return useContext(UnoCardEditorContext);
}
