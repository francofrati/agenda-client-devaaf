import { readData } from "@/lib/firebase/realtimeDatabase";
import { Business } from "@/types/businesses";
import { listOfObjectsToArray } from "@/utils/utils";
import "@/app/globals.css";

import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/authentication/authenticationProvider";
import { useAuth } from "@/hooks/useAuth";

interface props {
  businesses: Business[];
}

function Page({ businesses }: props) {
  const { user, loading } = useAuth();
  useEffect(() => {
    console.log(user);
  }, [user]);
  if (loading) return <>Loading...</>;
  return (
    <main>
      <ul
        className="list-none flex flex-col gap-3 m-10"
        style={{ listStyle: "none" }}
      >
        {businesses.map((business, index) => (
          <li key={index}>
            <button
              type="button"
              className="text-bold font-mono text-lg rounded-md shadow-xl p-3"
            >
              {business.businessName}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getServerSideProps() {
  const businessesRes = await readData(`/businesses`);
  if (!businessesRes)
    return {
      props: { businesses: [] },
    };
  const businesses = listOfObjectsToArray(businessesRes).map((business) => {
    return { businessName: business.businessName };
  });
  return { props: { businesses } };
}

export default Page;
