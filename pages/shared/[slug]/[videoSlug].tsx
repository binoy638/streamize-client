import { Text } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';

import { IVideo } from '../../../@types';
import Loader from '../../../components/Common/Loader';
import NotFound from '../../../components/Common/NotFound';
import Layout from '../../../components/Layout';
import Player from '../../../components/Player';
import useFetchSharedPlaylist from '../../../hooks/useFetchSharedPlaylist';
import useModal from '../../../hooks/useModal';
import { secondsToHHMMSS } from '../../../utils';

const SharedVideo = () => {
  const router = useRouter();

  const { slug, videoSlug } = router.query;

  const { isError, isLoading, data } = useFetchSharedPlaylist(slug as string);

  const [video, setVideo] = useState<IVideo>();

  const [continueVideo, setContinueVideo] = useState(false);

  const [videoSearchCompleted, setVideoSearchCompleted] = useState(false);

  const [videoProgress, setVideoProgress] = useState<number>(0);

  const modal = useModal();

  useEffect(() => {
    if (!data) return;

    const video = data.torrent.files.find(file => file.slug === videoSlug);
    if (video) {
      const key = `${video.slug}-progress`;
      const progress = localStorage.getItem(key);
      if (progress) {
        setVideoProgress(Number(progress));
        modal.showModal({
          title: `Do you want to continue from where you left? ${secondsToHHMMSS(
            Number(progress)
          )}`,
          positiveLabel: 'Yes',
          negativeLabel: 'No',
          onPositiveAction: () => {
            setContinueVideo(true);
          },
          onNegativeAction: () => {
            setContinueVideo(false);
          }
        });
      }
      setVideo(video);
    }

    setVideoSearchCompleted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, videoSlug]);

  if (isLoading || !videoSearchCompleted) {
    return <Loader />;
  }

  if (!video) {
    return <NotFound title="No Torrent Found" />;
  }
  if (isError) {
    return <NotFound title="Somthing went wrong" />;
  }

  return (
    <div className="flex h-full justify-center lg:items-center">
      <div className="lg:h-3/4 lg:w-3/4 flex-col justify-center">
        <Player
          video={video}
          shareSlug={slug as string}
          seekTo={continueVideo ? videoProgress : undefined}
        />
        <Text lineClamp={4} mt={20}>
          {video.name}
        </Text>
      </div>
    </div>
  );
};

SharedVideo.getLayout = (page: ReactElement) => (
  <Layout needAuth={false}>{page}</Layout>
);

export default SharedVideo;
