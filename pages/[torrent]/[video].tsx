import { Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

import Loader from '../../components/Common/Loader';
import NotFound from '../../components/Common/NotFound';
import Layout from '../../components/Layout';
import Player from '../../components/Player';
import useFetchVideo from '../../hooks/useFetchVideo';
import useModal from '../../hooks/useModal';
import { secondsToHHMMSS } from '../../utils';

const Video = () => {
  const router = useRouter();

  const { video } = router.query;

  const { isError, isLoading, data } = useFetchVideo(video as string);

  const [continueVideo, setContinueVideo] = useState(false);

  const modal = useModal();

  useEffect(() => {
    if (data && data.progress > 0) {
      modal.showModal({
        title: `Do you want to continue from where you left? ${secondsToHHMMSS(
          data.progress
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    return <NotFound title="No Video Found" />;
  }
  if (isError) {
    return <NotFound title="Something went wrong" />;
  }

  return (
    <div className="flex-col h-full justify-center lg:items-center overflow-hidden">
      <div className="lg:h-3/4 lg:w-3/4 flex-col justify-center ">
        <Player
          video={data}
          seekTo={continueVideo ? data.progress : undefined}
        />
        <Text lineClamp={4} mt={20}>
          {data.name}
        </Text>
      </div>
    </div>
  );
};

Video.getLayout = (page: ReactElement) => (
  <Layout needAuth={true}>{page}</Layout>
);

export default Video;
