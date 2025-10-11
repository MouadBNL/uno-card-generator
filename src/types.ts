import type { ReactNode } from "react";

export type UnoCardConfig = {
  name: string;
  image: string | null;
  backgroundColor: string;
  icon: () => ReactNode;
};
