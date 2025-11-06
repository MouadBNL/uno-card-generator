import { createContext, useContext } from "react";
import type { UnoCardConfig } from "@/types";

export type UnoCardEditorContextType = {
  cards: UnoCardConfig[];
  selectedCard: UnoCardConfig | null;
  card: {
    width: number;
    height: number;
    setWidth: (width: number) => void;
    setHeight: (height: number) => void;
  };
  colors: {
    red: string;
    blue: string;
    green: string;
    yellow: string;
    black: string;
  };
  page: {
    width: number;
    height: number;
    padding: number;
    rows: number;
    columns: number;
    setWidth: (width: number) => void;
    setHeight: (height: number) => void;
    setRows: (rows: number) => void;
    setColumns: (columns: number) => void;
    setPadding: (padding: number) => void;
  };
  setCards: (cards: UnoCardConfig[]) => void;
  setSelectedCard: (card: UnoCardConfig | null) => void;
  setCardConfig: (card: UnoCardConfig) => void;
  setColor: (
    color: string,
    key: "red" | "blue" | "green" | "yellow" | "black"
  ) => void;
};

export const UnoCardEditorContext = createContext<UnoCardEditorContextType>({
  cards: [],
  selectedCard: null,
  card: {
    width: 224,
    height: 320,
    setWidth: () => {},
    setHeight: () => {},
  },
  setCards: () => {},
  setSelectedCard: () => {},
  setCardConfig: () => {},
  colors: {
    red: "",
    blue: "",
    green: "",
    yellow: "",
    black: "",
  },
  page: {
    width: 45,
    height: 32,
    padding: 1,
    rows: 4,
    columns: 5,
    setWidth: () => {},
    setHeight: () => {},
    setRows: () => {},
    setColumns: () => {},
    setPadding: () => {},
  },
  setColor: () => {},
});

export function useUnoCardEditorContext() {
  return useContext(UnoCardEditorContext);
}
