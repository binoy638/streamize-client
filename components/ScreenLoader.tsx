import React from 'react';

export default function ScreenLoader() {
  return (
    <div className="fixed h-screen w-screen flex justify-center items-center ">
      <div>
        <span className="cursor-pointer text-4xl font-teko   text-primary  hover:opacity-75">
          Streamize
        </span>
        <div className="h-1 w-30 bg-red-500"></div>
      </div>
    </div>
  );
}
