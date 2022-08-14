import type { SortState } from '@/@types';

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

export const convertToBytes = (str: string) => {
  const times: { [char: string]: number } = {
    kb: 1,
    mb: 2,
    gb: 3,
    tb: 4,
  };
  const byteSequence = str.trim().slice(-2).toLowerCase();
  const num = str
    .trim()
    .slice(0, str.trim().length - 2)
    .trim();
  return +num * 1024 ** times[byteSequence]!;
};

export const nextSortState = (current: SortState) => {
  if (current === null) return 'desc';
  if (current === 'desc') return 'asc';
  return 'desc';
};
