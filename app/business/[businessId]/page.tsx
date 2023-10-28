"use client";
import { readData } from "@/lib/firebase/realtimeDatabase";
import { Business, BusinessService } from "@/types/businesses";
import { listOfObjectsToArray, numberToCurrency } from "@/utils/utils";
import Link from "next/link";
import React, {
  useEffect,
  useContext,
  useMemo,
  useCallback,
  useState,
} from "react";
import CalendarModal from "./components/calendarModal";

function Page({ params }: { params: { businessId: string } }) {
  const [business, setBusiness] = useState<Business>();
  const [selectedService, setSelectedService] = useState<BusinessService>();
  const [calendarModal, setCalendarModal] = useState<boolean>(false);

  const getBusiness = useCallback(async () => {
    const businessRes = await readData(`/businesses/${params.businessId}`);

    if (!businessRes) return;
    const business = {
      ...businessRes,
      services: listOfObjectsToArray(businessRes.services).map((service) => {
        return { serviceId: service[0], ...service[1] };
      }),
    };
    setBusiness(business);
  }, [params.businessId]);

  const closeCalendarModal = useCallback(() => {
    setCalendarModal(false);
    setSelectedService(undefined);
  }, [setCalendarModal, setSelectedService]);

  const openCalendarModal = useCallback(() => {
    setCalendarModal(true);
  }, [setCalendarModal]);

  const selectService = useCallback(
    (service: BusinessService | undefined) => {
      setSelectedService(service);
    },
    [setSelectedService]
  );

  useEffect(() => {
    getBusiness();
  }, []);

  return (
    <div>
      {business ? (
        <>
          <header className="flex items-center gap-10 pl-4">
            <Link
              className="rounded-full font-bold text-lg text-center w-8 h-8 border hover:bg-slate-100 cursor-pointer shadow-sm"
              href={"/businesses"}
            >
              {"<"}
            </Link>
            <h1 className="font-bold text-2xl font-mono m-4">
              {business.businessName}
            </h1>
          </header>
          <ul className="p-4 ">
            {business.services?.map((service) => {
              return (
                <li
                  key={service.serviceId}
                  onClick={() => {
                    selectService(service);
                    openCalendarModal();
                  }}
                  className="flex items-center justify-between border list-none max-w-[500px] p-3 rounded shadow-sm mb-2 hover:bg-slate-100 cursor-pointer"
                >
                  <span>{service.serviceName}</span>
                  {numberToCurrency(service.servicePrice)}
                </li>
              );
            })}
          </ul>
          <CalendarModal
            handleClose={closeCalendarModal}
            isOpen={calendarModal}
            service={selectedService}
            setDate={() => {}}
          />
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

export default Page;
