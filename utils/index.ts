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
