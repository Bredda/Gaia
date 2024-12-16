"use client";

import { createContext, useEffect, useState } from "react";
import { createFromClient } from "@/lib/supabase/client";
import { User } from "@supabase/auth-js";

interface AuthState {
  user: User | undefined;
  isAuth: boolean;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const getUser = async () => {
      const supabase = await createFromClient();
      const { data, error } = await supabase.auth.getUser();
      supabase.auth.onAuthStateChange((event, session) => {
        console.log(event, session);
        if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
          setUser(session?.user);
        }
        if (event === "SIGNED_OUT") {
          setUser(undefined);
        }
      });
    };
    getUser();
  }, []);

  const value = {
    user,
    isAuth: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
