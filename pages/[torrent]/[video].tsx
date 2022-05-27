import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { getPreviewLink, getVideo, getVideoLink } from '../../API';
import Player from '../../components/VideoPlayer';

const Video: NextPage = () => {
  const router = useRouter();

  const { video, torrent } = router.query;

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
      <>
        <div>
          <Player
            src={getVideoLink(video as string)}
            videoSlug={video as string}
            subtitle={data.subtitles}
            previewSrc={
              // data.progressPreview === true
              //   ? getPreviewLink(data.slug, `${data.slug}.vtt`)
              //   : undefined
              getPreviewLink(data.slug, `${data.slug}.vtt`)
            }
          />
          <div>{data.name}</div>
        </div>
      </>
    );
  }
};

export default Video;
