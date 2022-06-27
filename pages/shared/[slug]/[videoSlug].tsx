import { Text } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';

import Loader from '../../../components/Common/Loader';
import NotFound from '../../../components/Common/NotFound';
import Layout from '../../../components/Layout';
import Player from '../../../components/Player';
import { useSharedPlaylistVideoQuery } from '../../../generated/apolloComponents';
import useModal from '../../../hooks/useModal';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { secondsToHHMMSS } from '../../../utils';

const SharedVideo = () => {
  const { user } = useTypedSelector(state => state.user);

  const router = useRouter();

  const slug = router.query.slug as string;

  const videoSlug = router.query.videoSlug as string;

  const { loading, data, error } = useSharedPlaylistVideoQuery({
    variables: { input: { slug, videoSlug }, slug }
  });

  const [continueVideo, setContinueVideo] = useState(false);

  const [videoProgress, setVideoProgress] = useState<number>(0);

  const [isHost, setIsHost] = useState(false);

  const modal = useModal();

  useEffect(() => {
    if (!data) return;

    if (user.username === data.sharedPlaylist.user.username) {
      setIsHost(true);
    }
    const video = data.sharedPlaylistVideo;
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
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, videoSlug, isHost]);

  if (loading || !data?.sharedPlaylistVideo) {
    return <Loader />;
  }

  if (error) {
    return <NotFound title="Somthing went wrong" />;
  }

  return (
    <div className="flex h-full justify-center lg:items-center">
      <div className="lg:h-3/4 lg:w-3/4 flex-col justify-center">
        <Player
          video={data.sharedPlaylistVideo}
          shareSlug={slug as string}
          seekTo={continueVideo ? videoProgress : undefined}
          isHost={isHost}
        />
        <Text lineClamp={4} mt={20}>
          {data.sharedPlaylistVideo.name}
        </Text>
      </div>
    </div>
  );
};

SharedVideo.getLayout = (page: ReactElement) => (
  <Layout needAuth={false}>{page}</Layout>
);

export default SharedVideo;
