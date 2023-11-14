"use client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

function NotFound() {
  useEffect(() => {
    redirect("/businesses");
  }, []);
  return <div>Loading ...</div>;
}

export default NotFound;
