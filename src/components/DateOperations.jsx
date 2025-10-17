import React from "react";
import { parseISO, format, isToday, differenceInCalendarDays } from "date-fns";

function DateOperations(props) {
  const { value } = props;

  const dateOperation = (startAt) => {
    const date = differenceInCalendarDays(startAt, new Date());
    const parseDate = parseISO(startAt);

    if (date == 0) {
      return `Today, ${format(parseDate, "hh:mm a")}`;
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
      <div className="flex flex-col items-center justify-center">
        <span className="text-xs text-gray-600">starts in</span>
        <span className="text-sm">
          {value.startAt ? dateOperation(value.startAt) : "No Date"}
        </span>
      </div>
    </>
  );
}

export default DateOperations;
