export interface IDownloadInfo {
  downloadSpeed: number;
  uploadSpeed: number;
  progress: number;
  timeRemaining: number;
  paused: boolean;
  completed: boolean;
}
export type ConvertState = 'processing' | 'done' | 'error' | 'waiting';

export type TorrentStatus =
  | 'added'
  | 'downloading'
  | 'converting'
  | 'done'
  | 'error';
// | "waiting"
// | "pause";

export interface IVideo {
  name: string;
  slug: string;
  size: number;
  path: string;
  ext: string;
  subtitles: ISubtitle[];
  isConvertable: boolean;
  status: TorrentStatus;
  downloadInfo?: { downloaded: number; progress: number };
  convertStatus?: {
    progress: number;
    state: ConvertState;
  };
}
export interface ISubtitle {
  _id: string;
  fileName: string;
  title: string;
  language: string;
  path: string;
}

export interface IAddedTorrentFull {
  _id: string;
  slug: string;
  magnet: string;
  infoHash: string;
  name: string;
  size: number;
  files: IVideo[];
  isMultiVideos: boolean;
  status: 'downloading' | 'converting' | 'done';
  isMedia: boolean;
  downloadInfo?: IDownloadInfo;
}

export interface IAddedTorrentPartial {
  _id: string;
  slug: string;
  magnet: string;
  status: 'added' | 'error';
  isMedia: boolean;
}

export type IAddedTorrent = IAddedTorrentFull | IAddedTorrentPartial;
