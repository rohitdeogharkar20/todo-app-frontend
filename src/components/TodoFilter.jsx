import React, { useState } from "react";
import Select from "react-select";

function TodoFilter(props) {
  const { filter, setFilter, fetchTodos } = props;
  const dateOptions = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Tomorrow", value: "tomorrow" },
    // { label: "Custom Date", value: "customDate" },
  ];

  const completeOptions = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ];

  return (
    <>
      <div className="flex justify-between items-center gap-2 m-4">
        <Select
          className="basic-single "
          classNamePrefix="select"
          options={dateOptions}
          defaultValue={dateOptions[0]}
          onChange={(e) => setFilter((prev) => ({ ...prev, startAt: e.value }))}
        />
        <Select
          className="basic-single"
          classNamePrefix="select"
          options={completeOptions}
          name="completeStatus"
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, completeStatus: e.value }))
          }
        />
        <button onClick={() => fetchTodos(filter)}>Filter</button>
      </div>
    </>
  );
}

export default TodoFilter;
