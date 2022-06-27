import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';

import { getTorrent } from '../../API';
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

  // const { isError, isLoading, data } = useQuery(
  //   ['torrent', torrentSlug],
  //   () => getTorrent(torrentSlug),
  //   {
  //     refetchInterval: data => {
  //       if (data && data.status === 'done') {
  //         return false;
  //       }
  //       if (!data) {
  //         return false;
  //       }
  //       return 1000;
  //     },
  //     retry: 3
  //   }
  // );

  const { loading, error, data } = useTorrentQuery({
    variables: { slug: torrentSlug }
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
  data.torrent;
  return (
    <div>
      <Header data={data.torrent} showExtraOptions={true} />

      {data.torrent.files.length > 0 && (
        <VideoList
          videos={data.torrent.files}
          torrentSlug={data.torrent.slug}
        />
      )}

      <ExtraOptionsDrawer />
    </div>
  );
}

TorrentPage.getLayout = (page: ReactElement) => (
  <Layout needAuth={true}>{page}</Layout>
);

export default TorrentPage;
