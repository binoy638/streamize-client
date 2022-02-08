import { XIcon } from "@heroicons/react/solid";
import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";

function Snackbar() {
  const { show, message, type } = useTypedSelector(
    (state) => state.UI.snackbar
  );
  if (!show) return null;
  return (
    <div
      className={`h-8  ${
        type === "success"
          ? "bg-green-700"
          : type === "error"
          ? "bg-red-700"
          : "bg-blue-700"
      } px-4 rounded flex justify-between items-center text-white absolute bottom-5 left-0 right-0 mx-auto w-4/5 lg:w-1/2  `}
    >
      <div className="truncate pr-4">{message}</div>
      <XIcon className="h-5 w-5" />
    </div>
  );
}

export default Snackbar;
