import { Text } from '@mantine/core';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

import Layout from '@/components/Layout';

import Loader from '../../components/Common/Loader';
import NotFound from '../../components/Common/NotFound';
import Player from '../../components/Player';
import { useVideoQuery } from '../../generated/apolloComponents';
import useModal from '../../hooks/useModal';
import { secondsToHHMMSS } from '../../utils';

const Video = () => {
  const router = useRouter();

  const videoSlug = router.query.video as string;
  const torrentSlug = router.query.torrent as string;

  const { error, loading, data } = useVideoQuery({
    variables: { input: { torrentSlug, videoSlug }, videoSlug },
  });

  const [continueVideo, setContinueVideo] = useState(false);

  const modal = useModal();

  useEffect(() => {
    if (data && data.videoProgress > 0) {
      modal.showModal({
        title: `Do you want to continue from where you left? ${secondsToHHMMSS(
          data.videoProgress
        )}`,
        positiveLabel: 'Yes',
        negativeLabel: 'No',
        onPositiveAction: () => {
          setContinueVideo(true);
        },
        onNegativeAction: () => {
          setContinueVideo(false);
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) {
    return <Loader />;
  }
  if (!data) {
    return <NotFound title="No Video Found" />;
  }
  if (error) {
    return <NotFound title="Something went wrong" />;
  }

  return (
    <div className="h-full flex-col justify-center overflow-hidden lg:items-center">
      <div className="flex-col justify-center lg:h-3/4 lg:w-3/4 ">
        <Player
          video={data.video}
          seekTo={continueVideo ? data.videoProgress : undefined}
        />
        <Text lineClamp={4} mt={20}>
          {data.video.name}
        </Text>
      </div>
    </div>
  );
};

Video.getLayout = (page: ReactElement) => (
  <Layout needAuth={true}>{page}</Layout>
);

export default Video;
