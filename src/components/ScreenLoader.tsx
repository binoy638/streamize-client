import React from 'react';

export default function ScreenLoader() {
  return (
    <div className="fixed flex h-screen w-screen items-center justify-center ">
      <div>
        <span className="cursor-pointer font-teko text-4xl   text-primary  hover:opacity-75">
          Streamize
        </span>
        <div className=" h-1 bg-red-500"></div>
      </div>
    </div>
  );
}
