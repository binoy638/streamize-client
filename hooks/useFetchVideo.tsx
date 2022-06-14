import { useQuery } from 'react-query';

import { getUserVideoProgress, getVideo } from '../API';

const useFetchVideo = (videoSlug: string) => {
  return useQuery(
    ['video', videoSlug],
    async () => {
      if (!videoSlug) return;
      const [video, progress] = await Promise.all([
        getVideo(videoSlug),
        getUserVideoProgress(videoSlug)
      ]);
      return { ...video, ...progress };
    },
    { enabled: !!videoSlug }
  );
};

export default useFetchVideo;
