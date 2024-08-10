import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateFriendlyChatName = (author: string | null) => {
  if (!author) return;
  return author.startsWith("CH") || author === "+18333224149"
    ? "Chatbot"
    : author === "testPineapple"
    ? "You"
    : "Reporter";
};
