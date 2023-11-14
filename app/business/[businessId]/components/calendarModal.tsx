"use client";
import { BusinessService } from "@/types/businesses";
import { Modal } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState, useContext } from "react";
import DayAvailableSchedule from "./dayAvailableSchedule";
import { CalendarContext } from "../context/CalendarContext";

type PickerSelectionState = "partial" | "shallow" | "finish";
interface props {
  isOpen: boolean;
  handleClose: () => void;
  service: BusinessService | undefined;
  setDate: () => void;
}

interface SelectInfo {
  source: "year" | "month" | "date" | "customize";
}

function CalendarModal({ handleClose, isOpen, service }: props) {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [time, setTime] = useState<string>("");
  const [availableTimes, setAvailableTimes] = useState<Array<string>>([]);

  const { availableDates } = useContext(CalendarContext);

  const onChange = (
    value: Dayjs | null,
    selectionState: PickerSelectionState | undefined
  ) => {
    setDate(value as Dayjs);
  };

  const onTimeChange = (time: string) => {
    setTime(time);
  };

  useEffect(() => {
    if (availableDates.length) {
      // @ts-ignore
      const times = Object.entries(
        availableDates.find(
          (day: any) =>
            +Object.entries(day)[0][0] ===
            date.set("hour", 9).set("minute", 0).set("second", 0).unix()
        )
      )[0][1].map((o: any) => Object.entries(o)[0][0]);
      // .map((o: any) => Object.entries(o));
      // .map((arr) => Object.entries(arr[0])[0][0]);
      setAvailableTimes(times);
    }
    setTime("");
  }, [date]);

  useEffect(() => {
    if (availableDates.length)
      setDate(dayjs(+Object.entries(availableDates[0])[0][0] * 1000));
  }, [availableDates]);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div
        className="bg-white rounded-sm px-20 py-10 absolute top-[50%] left-[50%] "
        style={{ transform: "translate(-50%, -50%)", outline: "none" }}
      >
        <header>
          <h1 className="text-center font-mono text-lg font-medium border-b border-b-black">
            Set your appointment - {service?.serviceName}
          </h1>
        </header>
        <DateCalendar
          disablePast
          shouldDisableDate={(day) =>
            availableDates.find((date: any) => {
              const timestamp = +Object.entries(date)[0][0] * 1000;

              const d1 = dayjs(timestamp).format("DD/MM/YYYY");
              const d2 = day.format("DD/MM/YYYY");
              if (d1 === d2) {
                // console.log(d1, d2);
                return true;
              } else {
                return false;
              }
            })
              ? false
              : true
          }
          value={date}
          onChange={onChange}
        />
        <DayAvailableSchedule
          onTimeChange={onTimeChange}
          selectedTime={time}
          times={availableTimes}
        />
        <p className="text-center text-base font-mono font-normal mt-6">
          {date.format("DD-MM")}
          {time ? " at " + time : ""}
        </p>
      </div>
    </Modal>
  );
}

export default CalendarModal;
