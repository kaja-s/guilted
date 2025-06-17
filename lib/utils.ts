import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanJSON(text: string) {
  return text
    .trim()
    .replace(/^```json\s*/, "")
    .replace(/```$/, "");
}
