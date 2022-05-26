export interface IDownloadInfo {
  downloadSpeed: number;
  uploadSpeed: number;
  progress: number;
  timeRemaining: number;
  paused: boolean;
  completed: boolean;
}

export interface IFileDownloadInfo {
  downloaded: number;
  progress: number;
}

export enum VideoState {
  DOWNLOADING = 'downloading',
  PROCESSING = 'processing',
  DONE = 'done',
  ERROR = 'error',
  QUEUED = 'queued'
}

export enum TorrentState {
  DOWNLOADING = 'downloading',
  PAUSED = 'paused',
  DONE = 'done',
  QUEUED = 'queued',
  ERROR = 'error',
  ADDED = 'added',
  PROCESSING = 'processing'
}

export interface ISubtitle {
  _id: string;
  fileName: string;
  title: string;
  language: string;
  path: string;
}

export interface IVideo {
  name: string;
  slug: string;
  size: number;
  path: string;
  ext: string;
  subtitles: ISubtitle[];
  status: VideoState;
  downloadInfo?: IFileDownloadInfo;
  transcodingPercent: number;
}

export interface ITorrent {
  _id: string;
  slug: string;
  magnet: string;
  infoHash: string;
  name: string;
  size: number;
  files: IVideo[];
  status: TorrentState;
  downloadInfo?: IDownloadInfo;
}
