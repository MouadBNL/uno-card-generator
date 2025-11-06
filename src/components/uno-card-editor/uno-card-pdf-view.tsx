import type { CSSProperties, PropsWithChildren } from "react";
import { useUnoCardEditorContext } from "./uno-card-context";
import { UnoCard } from "../uno-card/uno-card";
import { cn } from "@/lib/utils";



export const UnoCardPdfView = () => {
  const { cards, page, card: cardConfig, selectedCard, setSelectedCard } = useUnoCardEditorContext();
  const PER_PAGE = page.columns * page.rows;
  const pages = Math.ceil(cards.length / PER_PAGE);

  const cardContainerStyle = {
    "width": `calc( ${cardConfig.width}cm * ${page.columns} + 1px * (${page.columns} + 1))`,
    "gridTemplateColumns": `repeat(${page.columns}, ${cardConfig.width}cm)`,
    "gridTemplateRows": `repeat(${page.rows}, ${cardConfig.height}cm)`,
  } satisfies CSSProperties


  return (
    <div className="grid grid-cols-1 gap-4">
      {Array.from({ length: pages }).map((_, index) => (
        <PdfPage key={index}>
          <div className="grid gap-[1px] bg-black p-[1px]" style={cardContainerStyle}>
            {cards.slice(index * PER_PAGE, (index + 1) * PER_PAGE).map((card) => (
              <div key={card.name} className={cn("cursor-pointer overflow-hidden bg-[#eaeaec]", selectedCard?.name === card.name && "outline outline-orange-600")} onClick={() => setSelectedCard(card)}>
                <UnoCard config={card} width={`${cardConfig.width}cm`} height={`${cardConfig.height}cm`} />
              </div>
            ))}
          </div>
        </PdfPage>
      ))}
    </div>
  )
}



const PdfPage = ({ children }: PropsWithChildren) => {
  const { page } = useUnoCardEditorContext();


  const pageStyle = {
    "width": `${page.width}cm`,
    "height": `${page.height}cm`,
    "padding": `${page.padding}cm`,
    "backgroundColor": "#FFF",
    "overflow": "hidden",
  } satisfies CSSProperties

  return (
    <div style={pageStyle} className="uno-card-pdf-page">
      {children}
    </div>
  )
}