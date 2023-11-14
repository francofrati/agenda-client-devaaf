import React, { useState } from "react";

function DayAvailableSchedule({ onTimeChange, selectedTime, times }: any) {
  const [available] = useState<Array<any>>([
    "10:00",
    "12:00",
    "13:00",
    "16:00",
  ]);
  return (
    <div className="flex flex-wrap w-full justify-center gap-4">
      {times.map((time: string) => {
        return (
          <button
            onClick={() => {
              onTimeChange(time);
            }}
            className={`rounded-lg p-3 text-base border shadow-sm ${
              selectedTime === time ? "bg-slate-50" : "bg-white"
            } hover:bg-slate-100 font-medium text-center `}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}

export default DayAvailableSchedule;
