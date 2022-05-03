import React from 'react';

function StatusIndicator({ type }: { type: 'downloading' | 'converting' }) {
  return (
    <span className="flex h-3 w-3 relative">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
          type === 'downloading' ? 'bg-green-400' : 'bg-orange-400'
        } opacity-75`}
      ></span>
      <span
        className={`relative inline-flex rounded-full h-3 w-3 ${
          type === 'downloading' ? 'bg-green-500' : 'bg-orange-500'
        } `}
      ></span>
    </span>
  );
}

export default StatusIndicator;
