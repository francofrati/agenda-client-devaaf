import { BusinessService } from "@/types/businesses";
import { Modal, Calendar } from "antd";
import type { CalendarProps } from "antd";
import { useState } from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

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

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
    console.log(mode);
    if (
      value.endOf("d").valueOf() >
        dayjs().subtract(1, "day").endOf("d").valueOf() &&
      value.endOf("d").valueOf() <
        dayjs(dayjs().valueOf() + 12096e5)
          .endOf("d")
          .valueOf()
    ) {
      setDate(value);
      console.log("in range");
      return;
    } else {
      const diffToStartOfDateRange = value.diff(dayjs().subtract(1, "day"));
      const diffToEndOdDateRange = value.diff(
        dayjs(dayjs().valueOf() + 12096e5)
      );
      if (diffToEndOdDateRange > diffToStartOfDateRange) {
        setDate(dayjs().subtract(1, "day"));
        console.log("Near to start");
      } else {
        console.log("Near to end");
        setDate(dayjs(dayjs().valueOf() + 12096e5));
      }
    }
  };
  const onChange = (value: Dayjs) => {
    console.log("onChange: ", value.format("DD-MM-YYYY"));
  };
  const onSelect = (date: Dayjs, selectInfo: SelectInfo) => {
    console.log("onSelect: ", date.format("DD-MM-YYYY"));
    if (selectInfo.source === "date") {
      setDate(date);
    }
  };
  return (
    <Modal
      title={"Select a date for your appointment: " + service?.serviceName}
      open={isOpen}
      onCancel={handleClose}
      onOk={handleClose}
    >
      <Calendar
        // disabledDate={(date) => {
        //   if (date.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY")) {
        //     return false;
        //   }
        //   return date.isBefore(dayjs(), "d");
        // }}
        fullscreen={false}
        onPanelChange={onPanelChange}
        value={date}
        onChange={onChange}
        onSelect={onSelect}
        mode="month"
        validRange={[
          dayjs().subtract(1, "day"),
          dayjs(dayjs().valueOf() + 12096e5),
        ]}
      />
    </Modal>
  );
}

export default CalendarModal;
