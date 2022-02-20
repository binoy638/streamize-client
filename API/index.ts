import { IAddedTorrent, IVideo } from '../@types';
import { Provider, TorrentData } from '../@types/store';
import { API, TorrentScrapper } from './config';

export const searchTorrentAPI = async (
  query: string,
  provider: Provider
): Promise<TorrentData[]> => {
  try {
    const { data } = await TorrentScrapper.get(`${provider}/search?q=${query}`);

    return data.result.map((item: TorrentData) => ({
      ...item,
      provider
    }));
  } catch (error) {
    console.log(error);
    throw new Error('Error while searching torrents');
  }
};

export const getAddedTorrents = async (): Promise<IAddedTorrent[]> => {
  try {
    const { data } = await API.get('/torrent');
    if (!data) return [];
    return data.torrents;
  } catch (error) {
    console.log(error);
    throw new Error('Error while fetching added torrents');
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
    throw new Error('Error while fetching torrent');
  }
};

export const getVideo = async (slug: string): Promise<IVideo | null> => {
  try {
    const { data } = await API.get(`/video/${slug}`);
    if (!data) return null;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error while fetching video info');
  }
};

export const getVideoLink = (torrentSlug: string, videoSlug: string) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}video/play/${videoSlug}`;

export const getDownloadLink = (videoSlug: string) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}video/download/${videoSlug}`;

export const getSubtitleLink = (filename: string) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}video/subtitle/${filename}`;

export const addMagnetLink = (magnet: string) =>
  API.post('/torrent', { magnet });

export const deleteTorrent = (slug: string) => API.delete(`/torrent/${slug}`);
