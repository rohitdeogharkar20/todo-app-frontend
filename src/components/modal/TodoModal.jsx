import React, { useContext, useState } from "react";
import { X } from "lucide-react";
import ThemeContext from "../../context/ThemeContext";

function TodoModal(props) {
  const { data, change, submit, message, setShowModal, setMessage, operation } =
    props;

  const [closing, setClosing] = useState(false);

  const { theme } = useContext(ThemeContext);

  const handleClose = () => {
    setClosing(true); // trigger slide-out
    setTimeout(() => {
      setShowModal(false);
      setMessage("");
    }, 300); // match animation duration
  };

  const handleBackgroundClick = (e) => {
    if (e.target.id === "modalBackground") {
      handleClose();
    }
  };

  return (
    <>
      <div
        id="modalBackground"
        onClick={handleBackgroundClick}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
      >
        <div
          className={`relative flex flex-col text-center justify-center items-center
          font-poppins border-4 py-4 w-[500px] max-w-[90%]
          bg-white p-6 rounded-2xl shadow-2xl transform transition-all 
          duration-300 ease-out
          ${
            closing
              ? "animate-[slideOut_0.3s_forwards]"
              : "animate-[slideIn_0.3s_forwards]"
          }`}
        >
          {/* Header */}
          {message && (
            <div className="w-full text-center text-red-500 mb-1">
              {message}
            </div>
          )}

          {/* Header */}
          <div className="flex items-center justify-between w-full p-2">
            {/* Placeholder for left spacing */}
            <div className="w-6"></div>

            {/* Centered operation */}
            <div className="flex-1 text-center font-semibold text-lg">
              {operation && operation === "update"
                ? "Update Todo"
                : "Create Todo"}
            </div>

            {/* Close button */}
            <button
              className="w-6 flex justify-end text-gray-500 hover:text-red-500 transition-colors duration-200"
              onClick={handleClose}
            >
              <X size={20} />
            </button>
          </div>

          {/* Inputs */}
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={change}
            className="border p-2 m-2 rounded w-4/5"
            placeholder="Title"
          />
          <textarea
            name="description"
            value={data.description}
            onChange={change}
            className="border p-2 m-2 rounded w-4/5"
            placeholder="Description"
          />
          <p className="m-1 flex items-center justify-center gap-2">
            <label htmlFor="startAt" className="text-gray-400">
              Start At
            </label>
            <input
              type="datetime-local"
              id="startAt"
              name="startAt"
              value={data.startAt}
              onChange={change}
              className="border p-1 rounded"
            />
          </p>
          <p className="m-1 flex items-center justify-center gap-2">
            <label htmlFor="endAt" className="text-gray-400">
              End At
            </label>
            <input
              type="datetime-local"
              id="endAt"
              name="endAt"
              value={data.endAt}
              onChange={change}
              className="border p-1 rounded"
            />
          </p>

          <button
            onClick={submit}
            style={
              theme == "light"
                ? { background: "#B4DEBD " }
                : { background: "#37353E" }
            }
            className={`${
              theme == "light" ? "text-black" : "text-white"
            } rounded-lg px-4 py-2 mt-3 hover:bg-blue-700 transition`}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default TodoModal;
