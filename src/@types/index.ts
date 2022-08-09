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
  DOWNLOADING = 'DOWNLOADING',
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
  ERROR = 'ERROR',
  QUEUED = 'QUEUED',
}

export enum TorrentState {
  DOWNLOADING = 'DOWNLOADING',
  PAUSED = 'PAUSED',
  DONE = 'DONE',
  QUEUED = 'QUEUED',
  ERROR = 'ERROR',
  ADDED = 'ADDED',
  PROCESSING = 'PROCESSING',
}

export interface ISubtitle {
  _id: string;
  fileName: string;
  title: string;
  language: string;
  path: string;
  src: string;
}

export interface IVideo {
  name: string;
  slug: string;
  size: number;
  path: string;
  ext: string;
  progressPreview: boolean;
  subtitles: ISubtitle[];
  status: VideoState;
  downloadInfo?: IFileDownloadInfo;
  transcodingPercent: number;
  progress?: number;
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

export enum SyncStreamsEvents {
  CREATED = 'created',
  NEW_MEMBER_JOINED = 'new-member-joined',
  PLAY = 'play',
  PAUSE = 'pause',
  SEEKED = 'seeked',
}
