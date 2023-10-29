"use client";
import { BusinessService } from "@/types/businesses";
import { Modal } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import DayAvailableSchedule from "./dayAvailableSchedule";

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
    setTime("");
  }, [date]);

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
            day.valueOf() > dayjs().valueOf() + 12096e5
          }
          value={date}
          onChange={onChange}
        />
        <DayAvailableSchedule onTimeChange={onTimeChange} selectedTime={time} />
        <p className="text-center text-base font-mono font-normal mt-6">
          {date.format("DD-MM")}
          {time ? " at " + time : ""}
        </p>
      </div>
    </Modal>
  );
}

export default CalendarModal;
