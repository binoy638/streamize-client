import { IAddedTorrent } from "../@types";
import { Provider, TorrentData } from "../@types/store";
import { API, TorrentScrapper } from "./config";

export const searchTorrentAPI = async (
  query: string,
  provider: Provider
): Promise<TorrentData[]> => {
  try {
    const { data } = await TorrentScrapper.get(`${provider}/search?q=${query}`);

    return data.result.map((item: TorrentData) => ({
      ...item,
      provider,
    }));
  } catch (error) {
    console.log(error);
    throw new Error("Error while searching torrents");
  }
};

export const getAddedTorrents = async (): Promise<IAddedTorrent[]> => {
  try {
    const { data } = await API.get("/torrent");
    if (!data) return [];
    return data.torrents;
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching added torrents");
  }
};

export const getTorrent = async (
  slug: string
): Promise<IAddedTorrent | null> => {
  try {
    const { data } = await API.get(`/torrent/${slug}`);
    if (!data) return null;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching torrent");
  }
};

export const getVideoLink = (torrentSlug: string, videoSlug: string) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}video/play/${torrentSlug}/${videoSlug}`;
// getVideoLink(slugT, slugV);
