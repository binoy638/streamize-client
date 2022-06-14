import { useQuery } from 'react-query';

import { getSharedPlaylist } from '../API';

const useFetchSharedVideo = (videoSlug: string) => {
  return useQuery(['shared-video', videoSlug], () =>
    getSharedPlaylist(videoSlug)
  );
};

export default useFetchSharedVideo;
