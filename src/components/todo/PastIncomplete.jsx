import React from "react";

function PastIncomplete() {
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `${VITE_BACKEND_URL}/todos/getTodoList`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos(response.data.data);
    } catch (err) {
      console.log("to do list error", err);
    }
  };

  return <></>;
}

export default PastIncomplete;
