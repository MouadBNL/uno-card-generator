import React from "react";


export function UnoCardIcon({ svg, position }: { svg: React.ReactNode, position: "top-left" | "bottom-right" }) {
  return (
    <div className="uno-card-icon" data-position={position}>
      {svg}
    </div>
  )
}