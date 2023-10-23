"use client";

import { auth } from "@/lib/firebase/config";
import { User, onAuthStateChanged } from "firebase/auth";
import { redirect } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = usePathname();

  useEffect(() => {
    const firebaseAuthEvent = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
        setLoading(false);
      } else {
        setUser(user);
        console.log(user);
        setLoading(false);
      }
    });

    return () => {
      //The execution will unsuscribe the event listener
      firebaseAuthEvent();
    };
  }, []);

  return {
    user,
    loading,
  };
}
