import { UnoSet } from "@/constants/uno-set"
import type { UnoCardConfig } from "@/types"
import { UnoCardEditorContext } from "./uno-card-context"
import { useState, type CSSProperties } from "react"
import { UnoCardConfigurator } from "./uno-card-config"
import { UnoCardPdfView } from "./uno-card-pdf-view"
import { useStorageState } from "@/hooks/use-storage-state"

export function UnoCardEditor() {
  const [cards, setCards] = useState<UnoCardConfig[]>(UnoSet)
  const [selectedCard, setSelectedCard] = useState<UnoCardConfig | null>(null)
  const [red, setRed] = useStorageState("#af1d35", "uno-color-red")
  const [blue, setBlue] = useStorageState("#065ba9", "uno-color-blue")
  const [green, setGreen] = useStorageState("#72aa2c", "uno-color-green")
  const [yellow, setYellow] = useStorageState("#ead325", "uno-color-yellow")
  const [black, setBlack] = useStorageState("#000000", "uno-color-black")

  const [pageWidth, setPageWidth] = useStorageState(32, "uno-page-number");
  const [pageHeight, setPageHeight] = useStorageState(45, "uno-page-height");
  const [pagePadding, setPagePadding] = useStorageState(1, "uno-page-padding");
  const [pageRows, setPageRows] = useStorageState(5, "uno-page-rows");
  const [pageColumns, setPageColumns] = useStorageState(5, "uno-page-cols");

  const [cardWidth, setCardWidth] = useStorageState(5.5, "uno-card-width");
  const [cardHeight, setCardHeight] = useStorageState(8.5, "uno-card-height");


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