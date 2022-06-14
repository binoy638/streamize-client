import { Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

import ContinueVideoModel from '../../components/Common/ContinueVideoModel';
import Loader from '../../components/Common/Loader';
import NotFound from '../../components/Common/NotFound';
import Layout from '../../components/Layout';
import Player from '../../components/Player';
import useFetchVideo from '../../hooks/useFetchVideo';

const Video = () => {
  const router = useRouter();

  const { video } = router.query;

  const { isError, isLoading, data } = useFetchVideo(video as string);

  const [showModel, setShowModel] = useState(false);

  const [continueVideo, setContinueVideo] = useState(false);

  useEffect(() => {
    if (data && data.progress > 0) {
      setShowModel(true);
    }
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
    <div className="flex h-full justify-center lg:items-center">
      <div className="lg:h-3/4 lg:w-3/4 flex-col justify-center">
        <Player
          video={data}
          seekTo={continueVideo ? data.progress : undefined}
        />
        <Text lineClamp={4} mt={20}>
          {data.name}
        </Text>
      </div>
      <ContinueVideoModel
        setContinueVideo={setContinueVideo}
        opened={showModel}
        setOpened={setShowModel}
        progress={data.progress}
      />
    </div>
  );
};

Video.getLayout = (page: ReactElement) => (
  <Layout needAuth={true}>{page}</Layout>
);

export default Video;
