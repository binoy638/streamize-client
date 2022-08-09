export const prettyTime = (seconds: number) => {
  if (seconds < 60) {
    return `${Math.round(seconds % 60)}s`;
  }
  if (seconds < 3600) {
    return `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
  }
  return `${Math.floor(seconds / 3600)}h ${
    Math.floor(seconds / 60) % 60
  }m ${Math.round(seconds % 60)}s`;
};

export const secondsToHHMMSS = (seconds: number) => {
  const hh = Math.floor(seconds / 3600);
  const mm = Math.floor(seconds / 60) % 60;
  const ss = Math.round(seconds % 60);
  return `${hh}:${mm < 10 ? '0' : ''}${mm}:${ss < 10 ? '0' : ''}${ss}`;
};
