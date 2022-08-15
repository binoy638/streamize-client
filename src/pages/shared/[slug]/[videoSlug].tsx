import { Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';

import Loader from '../../../components/Common/Loader';
import NotFound from '../../../components/Common/NotFound';
import Layout from '../../../components/Layout';
import Player from '../../../components/Player';
import { useSharedPlaylistVideoQuery } from '../../../generated/apolloComponents';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { secondsToHHMMSS } from '../../../utils';

const SharedVideo = () => {
  const { user } = useTypedSelector((state) => state.user);

  const router = useRouter();

  const slug = router.query.slug as string;

  const videoSlug = router.query.videoSlug as string;

  const { loading, data, error } = useSharedPlaylistVideoQuery({
    variables: { input: { slug, videoSlug }, slug },
  });

  const [continueVideo, setContinueVideo] = useState(false);

  const [videoProgress, setVideoProgress] = useState<number>(0);

  const [isHost, setIsHost] = useState(false);

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
        openConfirmModal({
          children: (
            <Text size="sm">
              {`Do you want to continue from where you left? ${secondsToHHMMSS(
                Number(progress)
              )}`}
            </Text>
          ),
          withCloseButton: false,
          centered: true,
          labels: { confirm: 'Yes', cancel: 'No' },
          onCancel: () => {
            setContinueVideo(false);
          },
          onConfirm: () => {
            setContinueVideo(true);
          },
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, videoSlug, isHost]);

  if (loading || !data?.sharedPlaylistVideo) {
    return <Loader />;
  }

  if (error) {
    return <NotFound title="Something went wrong" />;
  }

  return (
    <div className="h-full justify-center overflow-hidden  lg:flex  ">
      <div className="lg:w-10/12 ">
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
