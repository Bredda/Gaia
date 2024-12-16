import { useSafeContext } from "@/lib/utils";
import { SpaceContext } from "@/providers/space.provider";

export const useSpace = () => useSafeContext(SpaceContext);
