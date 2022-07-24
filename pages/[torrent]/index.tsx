import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import Loader from '../../components/Common/Loader';
import NotFound from '../../components/Common/NotFound';
import Layout from '../../components/Layout';
import { ExtraOptionsDrawer } from '../../components/Torrent/ExtraOptions';
import { Header } from '../../components/Torrent/Header';
import { VideoList } from '../../components/Torrent/VideoList';
import { useTorrentQuery } from '../../generated/apolloComponents';

function TorrentPage() {
  const router = useRouter();

  const torrentSlug = router.query.torrent as string;

  const { loading, error, data } = useTorrentQuery({
    variables: { slug: torrentSlug },
    pollInterval: 1000
  });

  if (loading) {
    return <Loader />;
  }
  if (!data) {
    return <NotFound title="No Torrent Found" />;
  }
  if (error) {
    return <NotFound title="Somthing went wrong" />;
  }

  return (
    <div>
      <Header data={data.torrent} showExtraOptions={true} />

      <VideoList torrent={data.torrent} torrentSlug={data.torrent.slug} />
      <ExtraOptionsDrawer />
    </div>
  );
}

TorrentPage.getLayout = (page: ReactElement) => (
  <Layout needAuth={true}>{page}</Layout>
);

export default TorrentPage;
