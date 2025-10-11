import { cn } from "@/lib/utils";
import { UnoCard } from "../uno-card/uno-card";
import { useUnoCardEditorContext } from "./uno-card-context";


export function UnoCardDisplay() {
  const { cards, setSelectedCard, selectedCard, size } = useUnoCardEditorContext();
  return (
    <div className="flex flex-wrap gap-8 justify-between p-8">
      {cards.map((card) => (
        <div key={card.name} className={cn("p-1 cursor-pointer border-2 rounded-md border-gray-200", selectedCard?.name === card.name && "border-primary")} onClick={() => setSelectedCard(card)}>
          <UnoCard config={card} size={size} />
        </div>
      ))}
    </div>
  )
}