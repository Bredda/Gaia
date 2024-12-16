import { clsx, type ClassValue } from "clsx";
import { useContext, type Context } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * A utility function that returns the value of a context or throws an error if the context is undefined.
 * @param {Context<T | undefined>} Context - The context to use.
 * @returns {T} The value of the context.
 */
export function useSafeContext<T>(Context: Context<T | undefined>) {
  const context = useContext(Context);
  if (context === undefined) throw new Error(`Context Provider not found`);
  return context as T;
}
