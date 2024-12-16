"use client";

import { useSafeContext } from "@/lib/utils";
import { SimplicityContext } from "@/providers/simplicity-provider";

export const useSimplicity = () => useSafeContext(SimplicityContext);
