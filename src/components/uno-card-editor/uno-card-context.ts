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
    setRed: (color: string) => void;
    setBlue: (color: string) => void;
    setGreen: (color: string) => void;
    setYellow: (color: string) => void;
    setBlack: (color: string) => void;
  };
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
  colors: {
    red: "",
    blue: "",
    green: "",
    yellow: "",
    black: "",
    setRed: () => {},
    setBlue: () => {},
    setGreen: () => {},
    setYellow: () => {},
    setBlack: () => {},
  },
});

export function useUnoCardEditorContext() {
  return useContext(UnoCardEditorContext);
}
