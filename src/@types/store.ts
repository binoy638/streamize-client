export type Provider = 'rarbg' | 'tpb' | '1337x' | 'nyaa';

export interface TorrentData {
  name: string;
  leeches: number;
  seeds: number;
  size: string;
  uploader?: string;
  link: string;
  file?: string;
  provider: Provider;
  added: number;
}

export interface ISearchBarSlice {
  type: 'add' | 'search';
  search: {
    query: string;
    torrentProvider: Provider;
  };
  add: {
    magnet: string;
  };
}

export interface IUIState {
  snackbar: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  };
}
