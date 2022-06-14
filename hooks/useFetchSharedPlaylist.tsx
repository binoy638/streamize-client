/* eslint-disable sonarjs/prefer-immediate-return */
import { useQuery } from 'react-query';

import { getSharedPlaylist } from '../API';

const useFetchSharedPlaylist = (videoSlug: string) => {
  return useQuery(
    ['shared-video', videoSlug],
    async () => {
      if (!videoSlug) return;
      const data = await getSharedPlaylist(videoSlug);
      return data;
    },
    { enabled: !!videoSlug }
  );
};

export default useFetchSharedPlaylist;
