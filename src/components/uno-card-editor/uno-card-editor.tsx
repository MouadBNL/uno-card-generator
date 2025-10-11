import { UnoSet } from "@/constants/uno-set"
import type { UnoCardConfig } from "@/types"
import { UnoCardEditorContext } from "./uno-card-context"
import { useState } from "react"
import { UnoCardDisplay } from "./uno-card-display"
import { UnoCardConfigurator } from "./uno-card-config"
import { toast } from "sonner"
import * as htmlToImage from 'html-to-image'


export function UnoCardEditor() {
  const [cards, setCards] = useState<UnoCardConfig[]>(UnoSet)
  const [size, setSize] = useState<number>(200);
  const [selectedCard, setSelectedCard] = useState<UnoCardConfig | null>(null)

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
    const link = document.createElement("a")
    link.href = dataURI
    link.download = `${card.name}.png`
    link.click()

    toast.success("Card exported")
  }

  return (
    <UnoCardEditorContext.Provider value={{ cards, setCards, size, setSize, selectedCard, setSelectedCard, setCardConfig, exportCard }}>
      <div className="flex-1 flex overflow-hidden">
        <aside className="w-[400px] overflow-y-auto border-r border-gray-300">
          <div className="p-4">
            <UnoCardConfigurator />
          </div>
        </aside>
        <div className="flex-1 bg-muted overflow-y-auto">
          <div className="p-4">
            <UnoCardDisplay />
          </div>
        </div>
      </div>
    </UnoCardEditorContext.Provider>
  )
}