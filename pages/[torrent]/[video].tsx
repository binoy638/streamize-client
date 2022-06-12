import { Text } from '@mantine/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useQuery } from 'react-query';

import { getPreviewLink, getVideo, getVideoLink } from '../../API';
import Layout from '../../components/Layout';
import Player from '../../components/VideoPlayer';

const Video = () => {
  const router = useRouter();

  const { video } = router.query;

  const { isError, isLoading, data } = useQuery(['video', video], () =>
    getVideo(video as string)
  );

  if (isError) {
    return (
      <>
        <Head>
          <title>Streamize</title>
        </Head>
        <div>Error</div>
      </>
    );
  } else if (isLoading) {
    return (
      <>
        <Head>
          <title>Streamize</title>
        </Head>
        <div>Loading</div>
      </>
    );
  } else {
    if (!data) return <div>No video data</div>;
    return (
      <div className="flex h-full justify-center lg:items-center">
        <div className="lg:h-3/4 lg:w-3/4 flex-col justify-center">
          <Player
            src={getVideoLink(video as string)}
            videoSlug={video as string}
            subtitle={data.subtitles}
            previewSrc={
              data.progressPreview === true
                ? getPreviewLink(data.slug, `${data.slug}.vtt`)
                : undefined
            }
          />
          <Text lineClamp={4} mt={20}>
            {data.name}
          </Text>
        </div>
      </div>
    );
  }
};

Video.getLayout = (page: ReactElement) => (
  <Layout needAuth={true}>{page}</Layout>
);

export default Video;
