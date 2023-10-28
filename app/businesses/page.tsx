"use client";
import { readData } from "@/lib/firebase/realtimeDatabase";
import { Business } from "@/types/businesses";
import { listOfObjectsToArray } from "@/utils/utils";
import Link from "next/link";

import React, { useCallback, useContext, useEffect, useState } from "react";

function Page() {
  const [businesses, setBusinesses] = useState<Array<Business>>([]);

  const getBusinesses = useCallback(async () => {
    const businessesRes = await readData(`/businesses`);
    if (!businessesRes) return;
    const businesses: Array<Business> = listOfObjectsToArray(businessesRes).map(
      (business: [string, Business]) => {
        return {
          businessName: business[1].businessName,
          businessId: business[1].businessId,
        };
      }
    );
    setBusinesses(businesses);
  }, []);

  useEffect(() => {
    getBusinesses();
  }, []);

  return (
    <main>
      <ul
        className="list-none flex flex-col gap-3 m-10"
        style={{ listStyle: "none" }}
      >
        {businesses.map((business, index) => (
          <li key={index}>
            <Link
              className="text-bold font-mono text-lg rounded-md shadow-xl p-3"
              href={`/business/${business.businessId}`}
            >
              {business.businessName}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Page;
