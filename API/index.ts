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
