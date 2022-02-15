import { XIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";

import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { toggleSnackbar } from "../../store/slice/UI.slice";

function Snackbar({ timeout = 5 }: { timeout?: number }) {
  const dispatch = useTypedDispatch();

  const { show, message, type } = useTypedSelector(
    (state) => state.UI.snackbar
  );

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (show) {
      const duration = 100 / ((timeout * 1000) / 100);
      let counter = 0;
      timer = setInterval(() => {
        setProgress((prevProgress) => prevProgress + duration);
        counter += duration;
        if (counter >= 100) {
          console.log("clearing");
          dispatch(toggleSnackbar("hide"));
          setProgress(0);
          clearInterval(timer);
        }
      }, 100);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
        console.log("clearing interval from return");
      }
    };
  }, [dispatch, timeout, show]);

  if (!show) return null;
  return (
    <div
      className={`h-8  ${
        type === "success"
          ? "bg-green-700"
          : (type === "error"
          ? "bg-red-700"
          : "bg-blue-700")
      } rounded flex flex-col justify-between  items-center text-white absolute bottom-5 left-0 right-0 mx-auto w-4/5 lg:w-1/2  `}
    >
      <div className="flex justify-between items-center rounded-t-sm  w-full h-full px-2">
        <div className="truncate pr-4">{message}</div>
        <XIcon
          className="h-5 w-5"
          onClick={() => dispatch(toggleSnackbar("hide"))}
        />
      </div>
      <div className="w-full bg-gray-200 h-1 rounded">
        <div
          className={`${
            type === "success"
              ? "bg-green-400"
              : (type === "error"
              ? "bg-red-400"
              : "bg-blue-400")
          } transition-all rounded-b-lg duration-100 ease-linear  h-1`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Snackbar;
