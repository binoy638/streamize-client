import { Text } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { IVideo } from '../../@types';
import {
  getPreviewLink,
  getSharedPlaylist,
  getSharedVideoLink
} from '../../API';
import Layout from '../../components/Layout';
import Player from '../../components/VideoPlayer';

const Stream = () => {
  const router = useRouter();
  const { slug, videoSlug } = router.query;
  const { isError, isLoading, data } = useQuery(['shared', slug], () =>
    getSharedPlaylist(slug as string)
  );

  const [video, setVideo] = useState<IVideo>();
  useEffect(() => {
    if (data) {
      const video = data.torrent.files.find(file => file.slug === videoSlug);
      setVideo(video);
    }
  }, [data, videoSlug]);
  if (isLoading || isError || !video) return <div>Loading</div>;
  return (
    <div className="flex h-full justify-center lg:items-center">
      <div className="lg:h-3/4 lg:w-3/4 flex-col justify-center">
        <Player
          src={getSharedVideoLink(slug as string, videoSlug as string)}
          videoSlug={videoSlug as string}
          subtitle={video.subtitles}
          previewSrc={
            video.progressPreview === true
              ? getPreviewLink(video.slug, `${video.slug}.vtt`)
              : undefined
          }
        />
        <Text lineClamp={4} mt={20}>
          {video.name}
        </Text>
      </div>
    </div>
  );
};

Stream.getLayout = (page: ReactElement) => (
  <Layout needAuth={false}>{page}</Layout>
);

export default Stream;
