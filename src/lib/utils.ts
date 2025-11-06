import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dataUrlToBlob(dataurl: string) {
  const parts = dataurl.split(","),
    mime = parts[0]?.match(/:(.*?);/)?.[1];
  if (parts[0].indexOf("base64") !== -1) {
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  } else {
    const raw = decodeURIComponent(parts[1]);
    return new Blob([raw], { type: mime });
  }
}

export function cmToPx(cm: number) {
  const dpi = 96; // standard CSS DPI
  const devicePixelRatio = window.devicePixelRatio || 1;
  return cm * (dpi / 2.54) * devicePixelRatio;
}
