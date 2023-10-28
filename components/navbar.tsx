"use client";
import { AuthContext } from "@/contexts/authentication/authenticationProvider";
import { signOutFromFirebase } from "@/lib/authentication/auth";
import React, { useContext } from "react";

function Navbar() {
  const { user } = useContext(AuthContext);
  if (!user) return <></>;
  return (
    <nav className="w-full">
      <button
        className="rounded-full border shadow-sm ml-auto"
        type="button"
        onClick={signOutFromFirebase}
      >
        Log Out
      </button>
    </nav>
  );
}

export default Navbar;
