import { useSafeContext } from "@/lib/utils";
import { AuthContext } from "@/providers/auth-provider";

export const useAuth = () => useSafeContext(AuthContext);
