import type { UnoCardConfig } from "../../types";
import { UnoCardIcon } from "./uno-card-icon";
import "./uno-card.css";

export function UnoCard({ config }: { config: UnoCardConfig }) {
  const image = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";
  return (
    <div className="uno-card-container" >
      <UnoCardIcon svg={config.icon()} position="top-left" />
      <UnoCardIcon svg={config.icon()} position="bottom-right" />
      <div className="uno-card-inner" style={{ backgroundColor: config.backgroundColor }}>
      </div>
      <div className="uno-card-ellipsis">
        <svg width="100%" viewBox="0 0 86 118" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M75.8894 2.59058C90.54 11.201 87.561 43.458 69.2357 74.6386C50.9103 105.819 24.1779 124.116 9.52731 115.506C-5.12332 106.895 -2.14435 74.6382 16.181 43.4575C34.5064 12.2769 61.2388 -6.01984 75.8894 2.59058Z" fill="#EAEAEC" />
        </svg>
      </div>

      <div className="uno-card-content" style={{ backgroundImage: `url(${image})` }}>
      </div>
    </div>
  )
}