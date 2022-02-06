export type Provider = "rarbg" | "piratebay" | "1337" | "nyaa";

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
  type: "add" | "search";
  search: {
    query: string;
    torrentProvider: Provider;
  };
  add: {
    magnet: string;
  };
}
