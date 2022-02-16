import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { getSubtitleLink, getVideo, getVideoLink } from '../../API';
import Player from '../../components/VideoPlayer';

const Video: NextPage = () => {
  const router = useRouter();

  const [slugV, setSlugV] = useState('');

  const [slugT, setSlugT] = useState('');

  const { isError, isLoading, data } = useQuery(['video', slugV], () =>
    getVideo(slugV)
  );

  useEffect(() => {
    const { videoSlug, torrentSlug } = router.query;

    if (videoSlug && typeof videoSlug === 'string') {
      setSlugV(videoSlug);
    }
    if (torrentSlug && typeof torrentSlug === 'string') {
      setSlugT(torrentSlug);
    }
  }, [router]);

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
      <>
        <div>
          <Player src={getVideoLink(slugT, slugV)} subtitle={data.subtitles} />
          <div>{data.name}</div>
        </div>
      </>
    );
  }
};

export default Video;
