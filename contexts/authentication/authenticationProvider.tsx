"use client";
import { useAuth } from "@/hooks/useAuth";
import { User } from "firebase/auth";
import { redirect, usePathname } from "next/navigation";
import { createContext, ReactNode } from "react";

interface contextProps {
  user: User | null;
}

interface providerProps {
  children: ReactNode;
}

export const AuthContext = createContext<contextProps>({ user: null });

function AuthenticationProvider({ children }: providerProps) {
  const path = usePathname();

  const { loading, user } = useAuth();

  if (loading) return <>Loading...</>;
  if (!loading && !user && path !== "/login") return redirect("/login");
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export default AuthenticationProvider;
