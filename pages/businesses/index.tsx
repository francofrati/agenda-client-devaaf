import { readData } from "@/lib/firebase/realtimeDatabase";
import { Business } from "@/types/businesses";
import { listOfObjectsToArray } from "@/utils/utils";
import "@/app/globals.css";

import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/authentication/authenticationProvider";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

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
      <h1 className="ml-10 mt-10 text-xl font-bold font-mono">Available Businesses</h1>
      <ul
        className="list-none flex flex-col items-start gap-5 m-10"
        style={{ listStyle: "none" }}
      >
        {businesses.map((business, index) => (
          <li className="bg-white text-black rounded-sm border hover:bg-slate-200 w-[300px] flex" key={index}>
            <Link
              href={'/business/' + business.businessId}
              style={{width:"100%",height:"100%",paddingLeft:16,paddingBottom:8,paddingTop:8}}
            >
              <span className="w-full h-full border-red-700">
                {business.businessName}
                </span>
            </Link>
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
    return { businessName: business[1].businessName, businessId: business[0] };
  });
  return { props: { businesses } };
}

export default Page;
