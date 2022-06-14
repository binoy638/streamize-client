import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import Loader from '../../../components/Common/Loader';
import NotFound from '../../../components/Common/NotFound';
import Layout from '../../../components/Layout';
import { Header } from '../../../components/Torrent/Header';
import { VideoList } from '../../../components/Torrent/VideoList';
import useFetchSharedPlaylist from '../../../hooks/useFetchSharedPlaylist';

const SharedPlaylist = () => {
  const router = useRouter();

  const { slug } = router.query;

  const { isError, isLoading, data } = useFetchSharedPlaylist(slug as string);

  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    return <NotFound title="Playlist doesn't exist." />;
  }
  if (isError) {
    return <NotFound title="Somthing went wrong" />;
  }
  return (
    <div>
      <Header data={data.torrent} />
      {data.torrent.files.length > 0 && (
        <VideoList
          videos={data.torrent.files}
          torrentSlug={data.torrent.slug}
          sharedSlug={slug as string}
        />
      )}
    </div>
  );
};

SharedPlaylist.getLayout = (page: ReactElement) => (
  <Layout needAuth={false}>{page}</Layout>
);

export default SharedPlaylist;
