import { ITorrent, IVideo } from '../@types';
import { Provider, TorrentData } from '../@types/store';
import { API, TorrentScrapper } from './config';

export const searchTorrentAPI = async (
  query: string,
  provider: Provider
): Promise<TorrentData[]> => {
  try {
    const { data } = await TorrentScrapper.get(`search/${provider}?q=${query}`);

    return data.results.map((item: TorrentData) => ({
      ...item,
      provider
    }));
  } catch (error) {
    console.log(error);
    throw new Error('Error while searching torrents');
  }
};

export const getAddedTorrents = async (): Promise<{
  torrents: ITorrent[];
  diskSpace: { size: number; free: number };
}> => {
  try {
    const { data } = await API.get('/torrent');

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error while fetching added torrents');
  }
};

export const getTorrent = async (slug: string): Promise<ITorrent | null> => {
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

export const getVideoLink = (videoSlug: string) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}video/stream/${videoSlug}/${videoSlug}.m3u8`;

export const getDownloadLink = (videoSlug: string) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}video/download/${videoSlug}`;

export const getSubtitleLink = (videoSlug: string, filename: string) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}video/subtitle/${videoSlug}/${filename}`;

export const getPreviewLink = (videoSlug: string, filename: string) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}video/preview/${videoSlug}/${filename}`;

export const addMagnetLink = (magnet: string) =>
  API.post('/torrent', { magnet });

export const deleteTorrent = (slug: string) => API.delete(`/torrent/${slug}`);

export const signIn = ({
  username,
  password
}: {
  username: string;
  password: string;
}) => API.post('/auth/signin', { username, password });

export const signOut = () => API.post('/auth/signout');

export const verifyUser = () => API.post('/auth/verify');
