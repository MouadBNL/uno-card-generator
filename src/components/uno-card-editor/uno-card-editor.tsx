import { UnoSet } from "@/constants/uno-set"
import type { UnoCardConfig } from "@/types"
import { UnoCardEditorContext } from "./uno-card-context"
import { useState, type CSSProperties } from "react"
// import { UnoCardDisplay } from "./uno-card-display"
import { UnoCardConfigurator } from "./uno-card-config"
import { toast } from "sonner"
import * as htmlToImage from 'html-to-image'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { dataUrlToBlob } from "@/lib/utils"
import { UnoCardPrintView } from "./uno-card-print-view"
import html2pdf from "html2pdf.js"
import { Button } from "../ui/button"

export function UnoCardEditor() {
  const [cards, setCards] = useState<UnoCardConfig[]>(UnoSet)
  const [size, setSize] = useState<number>(200);
  const [selectedCard, setSelectedCard] = useState<UnoCardConfig | null>(null)
  const [red, setRed] = useState<string>(localStorage.getItem("uno-color-red") || "#af1d35")
  const [blue, setBlue] = useState<string>(localStorage.getItem("uno-color-blue") || "#065ba9")
  const [green, setGreen] = useState<string>(localStorage.getItem("uno-color-green") || "#72aa2c")
  const [yellow, setYellow] = useState<string>(localStorage.getItem("uno-color-yellow") || "#ead325")
  const [black, setBlack] = useState<string>(localStorage.getItem("uno-color-black") || "#000000")


  const setCardConfig = (card: UnoCardConfig) => {
    setCards(cards.map((c) => c.name === card.name ? card : c))
  }

  const exportCard = async (id: string) => {
    const card = cards.find((c) => c.name === id)
    if (!card) {
      return toast.error("Card not found")
    }
    const element = document.getElementById(id) as HTMLElement

    const dataURI = await htmlToImage.toPng(element)
    saveAs(dataURI, `${card.name}.png`)

    toast.success("Card exported")
  }

  const exportAllCards = async () => {
    const zip = new JSZip()
    for (const card of cards) {
      const element = document.getElementById(card.name) as HTMLElement
      const dataURI = await htmlToImage.toPng(element)
      zip.file(`${card.name}.png`, dataUrlToBlob(dataURI))
    }
    const content = await zip.generateAsync({ type: "blob" })
    saveAs(content, "uno-cards.zip")
  }

  const exportPrint = async () => {
    const el = document.getElementById("printing-view");
    if (el == null) return;
    await html2pdf().set({
      enableLinks: true,
      jsPDF: {
        // format: [cmToPx(32), cmToPx(45)]
        format: [645 / 2, 1700 / 4]
      }
    }).from(el).toImg().toPdf().save();
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

  return (
    <UnoCardEditorContext.Provider value={{ cards, setCards, size, setSize, selectedCard, setSelectedCard, setCardConfig, exportCard, exportAllCards, colors: { red, blue, green, yellow, black }, setColor }}>
      <div className="flex-1 flex overflow-hidden">
        <aside className="w-[400px] overflow-y-auto border-r border-gray-300">
          <div className="p-4">
            <Button onClick={exportPrint}>export</Button>
            <UnoCardConfigurator />
          </div>
        </aside>
        <div className="flex-1 bg-muted overflow-y-auto" style={style}>
          <div className="p-4">
            {/* <UnoCardDisplay /> */}
            <UnoCardPrintView colorStyles={style} />

          </div>
        </div>
      </div>
    </UnoCardEditorContext.Provider>
  )
}