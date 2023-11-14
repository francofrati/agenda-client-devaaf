import dayjs from "dayjs";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

export const CalendarContext = createContext<any>({});

export default function CalendarProvider({
  children,
  b,
}: {
  children: ReactNode;
  b: string;
}) {
  const [availableDates, setAvailableDates] = useState<Array<any>>([]);

  const getAvailableDates = useCallback(
    async (ref: string, d: number | string) => {
      try {
        const datesRes = await fetch(
          `/api/appointments/days?ref=${ref}&d=${d}`
        );
        const dates = await datesRes.json();

        setAvailableDates(dates);
      } catch (error: any) {
        console.log(error.message);
      }
    },
    [setAvailableDates]
  );

  useEffect(() => {
    const d = dayjs().set("hour", 9).set("minute", 0).set("second", 0).unix();
    getAvailableDates(b, d);
  }, []);

  return (
    <CalendarContext.Provider value={{ availableDates: availableDates }}>
      {children}
    </CalendarContext.Provider>
  );
}
