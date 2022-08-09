import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import React from 'react';

import Loader from '../../../components/Common/Loader';
import NotFound from '../../../components/Common/NotFound';
import Layout from '../../../components/Layout';
import { Header } from '../../../components/Torrent/Header';
import { VideoList } from '../../../components/Torrent/VideoList';
import { useSharedPlaylistQuery } from '../../../generated/apolloComponents';

const SharedPlaylist = () => {
  const router = useRouter();

  const slug = router.query.slug as string;

  const { loading, data, error } = useSharedPlaylistQuery({
    variables: { slug },
    pollInterval: 1000,
  });

  if (loading) {
    return <Loader />;
  }
  if (!data) {
    return <NotFound title="Playlist doesn't exist." />;
  }
  if (error) {
    return <NotFound title="Somthing went wrong" />;
  }
  return (
    <div>
      <Header data={data.sharedPlaylist.torrent} />
      <VideoList
        torrent={data.sharedPlaylist.torrent}
        torrentSlug={data.sharedPlaylist.torrent.slug}
        sharedSlug={slug as string}
      />
    </div>
  );
};

SharedPlaylist.getLayout = (page: ReactElement) => (
  <Layout needAuth={false}>{page}</Layout>
);

export default SharedPlaylist;
