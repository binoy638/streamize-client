import React from 'react';

function StatusIndicator({ type }: { type: 'downloading' | 'converting' }) {
  return (
    <span className="relative flex h-3 w-3">
      <span
        className={`absolute inline-flex h-full w-full animate-ping rounded-full ${
          type === 'downloading' ? 'bg-green-400' : 'bg-orange-400'
        } opacity-75`}
      ></span>
      <span
        className={`relative inline-flex h-3 w-3 rounded-full ${
          type === 'downloading' ? 'bg-green-500' : 'bg-orange-500'
        } `}
      ></span>
    </span>
  );
}

export default StatusIndicator;
