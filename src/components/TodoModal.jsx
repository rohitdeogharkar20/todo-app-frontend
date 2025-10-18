import React from "react";
import { X } from "lucide-react";

function TodoModal(props) {
  const { data, change, submit, message, setShowModal, setMessage } = props;
  return (
    <>
      <div
        className="absolute container flex flex-col text-center justify-center items-center
          createTodoModal font-poppins border-4 py-4  hover:shadow-md w-1/3
          bg-white p-6 rounded-2xl shadow-xl z-10 transform transition-all 
          duration-300 ease-out translate-y-10 opacity-0 animate-[slideIn_0.3s_forwards]"
      >
        <div className="flex items-center justify-between w-full p-2">
          <div className="message flex-1 text-red-500">
            {message ? message : ""}
          </div>

          <button
            className="transition-opacity duration-300"
            onClick={() => {
              setShowModal(false);
              setMessage(""); // to do transition for closing modal
            }}
          >
            <X />
          </button>
        </div>

        <input
          type="text"
          name="title"
          value={data.title}
          onChange={change}
          className="border p-2 m-2 rounded w-1/2"
          placeholder="Title"
        />

        <textarea
          type="text"
          name="description"
          value={data.description}
          onChange={change}
          className="border p-2 m-2 rounded w-1/2"
          placeholder="Description"
        />

        <p className="m-1">
          <label htmlFor="" className="mx-3 text-gray-400">
            Start At{" "}
          </label>

          <input
            type="datetime-local"
            id="startAt"
            value={data.startAt}
            name="startAt"
            onChange={change}
            placeholder="startAt"
          />
        </p>

        <p className="m-1">
          <label htmlFor="" className="mx-4 text-gray-400">
            End At{" "}
          </label>
          <input
            type="datetime-local"
            id="endAt"
            value={data.endAt}
            name="endAt"
            onChange={change}
            placeholder="endAt"
          />
        </p>

        <button onClick={submit}>Save</button>
      </div>
    </>
  );
}

export default TodoModal;
