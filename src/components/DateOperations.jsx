import React from "react";
import {
  parseISO,
  format,
  differenceInCalendarDays,
  differenceInMinutes,
} from "date-fns";

function DateOperations(props) {
  const { value } = props;

  const dateOperation = (startAt) => {
    const date = differenceInCalendarDays(startAt, new Date());
    const minuteDiff = differenceInMinutes(startAt, new Date());
    const parseDate = parseISO(startAt);

    if (date == 0 && minuteDiff < 15) {
      return `In ${Number(minuteDiff) + 1} mins`;
    }
    if (date == 0) {
      return `${format(parseDate, "hh:mm a")}`;
    }
    if (date > 0 && date <= 7) {
      return `${format(parseDate, "EEE")}, ${format(parseDate, "hh:mm a")}`;
    }
    if (date > 7 && date < 14) {
      return `Next Week, ${format(parseDate, "EEE")}`;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center font-poppins">
        <span className="text-xs text-gray-600">
          {differenceInMinutes(value.startAt, new Date()) < 15
            ? `Starts In`
            : `Starts At`}
        </span>
        <span className="text-sm">
          {value.startAt ? dateOperation(value.startAt) : "--"}
        </span>
      </div>
    </>
  );
}

export default DateOperations;
