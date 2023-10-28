"use client";
import { AuthContext } from "@/contexts/authentication/authenticationProvider";
import { signOutFromFirebase } from "@/lib/authentication/auth";
import Link from "next/link";
import React, { useContext } from "react";

function Navbar() {
  const { user } = useContext(AuthContext);
  if (!user) return <></>;
  return (
    <nav className="w-full border flex justify-between p-2">
      <button
        className="rounded-full border py-2 px-3 shadow-sm hover:bg-slate-100"
        type="button"
        onClick={signOutFromFirebase}
      >
        Log Out
      </button>
    </nav>
  );
}

export default Navbar;
