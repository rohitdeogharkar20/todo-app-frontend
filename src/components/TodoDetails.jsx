import { format, parseISO } from "date-fns";
import { X } from "lucide-react";

function TodoDetails(props) {
  const { showTodo, closeTodo } = props;

  return (
    <>
      {showTodo.map((value, i) => {
        return (
          <div
            key={i}
            className="border border-gray-400 my-2 rounded-2xl p-4 font-poppins shadow-sm hover:shadow-lg transition-shadow duration-200 w-full max-w-[600px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-gray-700">
                #{value.index + 1}
              </span>
              <h2 className="text-lg font-semibold text-center flex-1 truncate px-2">
                {value.title}
              </h2>
              <button
                onClick={() => closeTodo(value)}
                className="text-gray-500 hover:text-red-500 transition-colors duration-150"
              >
                <X />
              </button>
            </div>

            {/* Details */}
            <div className="grid grid-cols-[140px_minmax(0,1fr)] gap-y-2 w-full">
              {/* Description */}
              <p className="text-right font-medium text-gray-600 pr-2">
                Description:
              </p>
              <div className="break-words whitespace-normal border border-gray-200 rounded-md p-2 bg-gray-50 w-full max-w-[300px] overflow-hidden">
                {value.description || "(No Description)"}
              </div>

              {/* Start Date */}
              <p className="text-right font-medium text-gray-600 pr-2">
                Start Date:
              </p>
              <p className="truncate max-w-[300px]">
                {value.startAt
                  ? format(parseISO(value.startAt), "MMM d, yyyy hh:mm a")
                  : "(Not Specified)"}
              </p>

              {/* End Date */}
              <p className="text-right font-medium text-gray-600 pr-2">
                End Date:
              </p>
              <p className="truncate max-w-[300px]">
                {value.endAt
                  ? format(parseISO(value.endAt), "MMM d, yyyy hh:mm a")
                  : "(Not Specified)"}
              </p>

              {/* Completed */}
              <p className="text-right font-medium text-gray-600 pr-2">
                Completed:
              </p>
              <p className="truncate max-w-[300px]">
                {value.completeStatus == 1 ? "Yes" : "No"}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TodoDetails;
