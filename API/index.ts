import { AxiosResponse } from 'axios';

import { ITorrent, IVideo } from '../@types';
import { Provider, TorrentData } from '../@types/store';
import { User } from '../store/slice/user.slice';
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

export const getVideo = async (slug: string): Promise<IVideo> => {
  try {
    const { data } = await API.get<IVideo>(`/video/${slug}`);
    // eslint-disable-next-line unicorn/no-array-for-each
    data.subtitles.forEach(sub => {
      sub.src = `${process.env.NEXT_PUBLIC_BASE_URL}video/subtitle/${data.slug}/${sub.fileName}`;
      return sub;
    });
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

export const getPreviewLink = (videoSlug: string, filename: string) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}video/preview/${videoSlug}/${filename}`;

export const addMagnetLink = (magnet: string) =>
  API.post('/torrent', { magnet });

export const deleteTorrent = (slug: string) => API.delete(`/torrent/${slug}`);

export const shareTorrent = async ({
  torrent,
  mediaId,
  isTorrent,
  expiresIn
}: {
  torrent: string;
  mediaId: string;
  isTorrent: boolean;
  expiresIn: Date;
}): Promise<string> => {
  try {
    const { data } = await API.post<{ slug: string }>('/share/create', {
      torrent,
      mediaId,
      isTorrent,
      expiresIn
    });
    return data.slug;
  } catch (error) {
    console.log(error);
    throw new Error('Error while sharing torrent');
  }
};

export const signIn = ({
  username,
  password
}: {
  username: string;
  password: string;
}) => API.post('/auth/signin', { username, password });

export const signOut = () => API.post('/auth/signout');

export const verifyUser = (): Promise<AxiosResponse<{ user: User }>> =>
  API.post('/auth/verify');

export const getSharedPlaylist = async (
  slug: string
): Promise<{ torrent: ITorrent; user: string }> => {
  const { data } = await API.get(`/share/${slug}`);
  return data;
};

export const getSharedVideoLink = (slug: string, videoSlug: string) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}share/stream/${slug}/${videoSlug}/${videoSlug}.m3u8`;

export const postUserVideoProgress = (videoSlug: string, progress: number) =>
  API.post(`/video/progress/${videoSlug}`, { progress });

export const getUserVideoProgress = async (videoSlug: string) => {
  try {
    const { data } = await API.get<{ progress: number }>(
      `/video/progress/${videoSlug}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return { progress: 0 };
  }
};
