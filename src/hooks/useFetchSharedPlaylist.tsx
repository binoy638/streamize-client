/* eslint-disable consistent-return */
import { useQuery } from '@tanstack/react-query';

import { getSharedPlaylist } from '../API';

const useFetchSharedPlaylist = (videoSlug: string) => {
  return useQuery(
    ['shared-video', videoSlug],
    async () => {
      if (!videoSlug) return;
      const data = await getSharedPlaylist(videoSlug);
      return data;
    },
    { enabled: !!videoSlug, refetchOnWindowFocus: false }
  );
};

export default useFetchSharedPlaylist;
