import type { ReactNode } from "react";

export type UnoCardConfig = {
  name: string;
  backgroundColor: string;
  icon: () => ReactNode;
};
