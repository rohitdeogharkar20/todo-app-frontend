import React, { useState } from "react";

function TodoFilter() {
  const [date, setDate] = useState();

  return (
    <>
      <form class="max-w-sm mx-auto">
        <label for="underline_select" class="sr-only">
          Underline select
        </label>
        <select
          id="underline_select"
          class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="customDateRange">Custom Date Range</option>
        </select>
      </form>
    </>
  );
}

export default TodoFilter;
