import { cn } from "@/lib/utils";
import { UnoCard, UnoCardEmpty } from "../uno-card/uno-card";
import { useUnoCardEditorContext } from "./uno-card-context";
import type { CSSProperties } from "react";


const CARDS_PER_ROW = 5;
export function UnoCardPrintView({ colorStyles }: { colorStyles: CSSProperties }) {
  const { cards, setSelectedCard, selectedCard } = useUnoCardEditorContext();


  const empty = cards.length % CARDS_PER_ROW == 0 ? [] : Array.from({ length: CARDS_PER_ROW - cards.length % CARDS_PER_ROW }, (_, i) => i + 1);


  const size = 224;
  const pageStyle = {
    "width": "32cm",
    "height": "45cm",
    "backgroundColor": "#FFF",
  } satisfies CSSProperties
  return (
    <div style={pageStyle} className="overflow-auto">

      <div className="p-8 border border-gray-800" style={{ ...colorStyles }} id="printing-view">
        <div className="grid gap-[1px] bg-black p-[1px] grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
          {cards.map((card, i) => (
            <>

              {(i > 0 && i % 20 == 0) && <div className="html2pdf__page-break w-full col-span-full"></div>}
              <div
                key={card.name}
                className={cn(
                  "cursor-pointer bg-[#eaeaec]",
                  selectedCard?.name === card.name && "outline outline-orange-600"
                )}
                onClick={() => setSelectedCard(card)}
              >
                <UnoCard config={card} size={size} />
              </div>
            </>
          ))}
          {empty.map((i) => (
            <div
              key={i}
              className="cursor-pointer bg-[#eaeaec]"
              id={`empty-${i}`}
            >
              <UnoCardEmpty size={size} />
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}