import { useQuery } from 'react-query';

import { getUserVideoProgress, getVideo } from '../API';

const useFetchVideo = (videoSlug: string) => {
  return useQuery(['video', videoSlug], async () => {
    const [video, progress] = await Promise.all([
      getVideo(videoSlug),
      getUserVideoProgress(videoSlug)
    ]);
    return { ...video, ...progress };
  });
};

export default useFetchVideo;
