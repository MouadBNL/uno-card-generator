import { UnoSet } from "@/constants/uno-set"
import type { UnoCardConfig } from "@/types"
import { UnoCardEditorContext } from "./uno-card-context"
import { useState, type CSSProperties } from "react"
import { UnoCardConfigurator } from "./uno-card-config"
import { UnoCardPdfView } from "./uno-card-pdf-view"

export function UnoCardEditor() {
  const [cards, setCards] = useState<UnoCardConfig[]>(UnoSet)
  const [selectedCard, setSelectedCard] = useState<UnoCardConfig | null>(null)
  const [red, setRed] = useState<string>(localStorage.getItem("uno-color-red") || "#af1d35")
  const [blue, setBlue] = useState<string>(localStorage.getItem("uno-color-blue") || "#065ba9")
  const [green, setGreen] = useState<string>(localStorage.getItem("uno-color-green") || "#72aa2c")
  const [yellow, setYellow] = useState<string>(localStorage.getItem("uno-color-yellow") || "#ead325")
  const [black, setBlack] = useState<string>(localStorage.getItem("uno-color-black") || "#000000")

  const [pageWidth, setPageWidth] = useState<number>(32);
  const [pageHeight, setPageHeight] = useState<number>(45);
  const [pagePadding, setPagePadding] = useState<number>(1);
  const [pageRows, setPageRows] = useState<number>(5);
  const [pageColumns, setPageColumns] = useState<number>(5);

  const [cardWidth, setCardWidth] = useState<number>(5.5);
  const [cardHeight, setCardHeight] = useState<number>(8.5);


  const setCardConfig = (card: UnoCardConfig) => {
    setCards(cards.map((c) => c.name === card.name ? card : c))
  }


  const style = {
    "--uno-color-red": red,
    "--uno-color-blue": blue,
    "--uno-color-green": green,
    "--uno-color-yellow": yellow,
    "--uno-color-black": black,
  } as CSSProperties

  const setColor = (color: string, key: "red" | "blue" | "green" | "yellow" | "black") => {
    localStorage.setItem(`uno-color-${key}`, color);
    switch (key) {
      case "red":
        setRed(color)
        break
      case "blue":
        setBlue(color)
        break
      case "green":
        setGreen(color)
        break
      case "yellow":
        setYellow(color)
        break
      case "black":
        setBlack(color)
        break
    }
  }

  const page = {
    width: pageWidth,
    height: pageHeight,
    padding: pagePadding,
    rows: pageRows,
    columns: pageColumns,
    setWidth: setPageWidth,
    setHeight: setPageHeight,
    setRows: setPageRows,
    setColumns: setPageColumns,
    setPadding: setPagePadding,
  }

  const card = {
    width: cardWidth,
    height: cardHeight,
    setWidth: setCardWidth,
    setHeight: setCardHeight,
  }


  return (
    <UnoCardEditorContext.Provider value={{ cards, page, card, setCards, selectedCard, setSelectedCard, setCardConfig, colors: { red, blue, green, yellow, black }, setColor }}>
      <div className="flex-1 flex overflow-hidden">
        <aside className="w-[400px] overflow-y-auto border-r border-gray-300">
          <div className="p-4">
            <UnoCardConfigurator />
          </div>
        </aside>
        <div className="flex-1 bg-muted overflow-y-auto" style={style}>
          <div className="p-4">
            {/* <UnoCardDisplay /> */}
            <UnoCardPdfView />
            {/* <UnoCardPrintView colorStyles={style} /> */}

          </div>
        </div>
      </div>
    </UnoCardEditorContext.Provider>
  )
}