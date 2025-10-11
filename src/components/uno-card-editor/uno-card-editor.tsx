import { UnoSet } from "@/constants/uno-set"
import type { UnoCardConfig } from "@/types"
import { UnoCardEditorContext } from "./uno-card-context"
import { useState } from "react"
import { UnoCardDisplay } from "./uno-card-display"
import { UnoCardConfigurator } from "./uno-card-config"



export function UnoCardEditor() {
  const [cards, setCards] = useState<UnoCardConfig[]>(UnoSet)
  const [size, setSize] = useState<string>("200px");
  const [selectedCard, setSelectedCard] = useState<UnoCardConfig | null>(null)

  const setCardConfig = (card: UnoCardConfig) => {
    setCards(cards.map((c) => c.name === card.name ? card : c))
  }

  return (
    <UnoCardEditorContext.Provider value={{ cards, setCards, size, setSize, selectedCard, setSelectedCard, setCardConfig }}>
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