import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { Drawer, Skeleton, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import { useQuery } from 'react-query';

import { getTorrent, shareTorrent } from '../API';
import Loader from '../components/Common/Loader';
import NotFound from '../components/Common/NotFound';
import Layout from '../components/Layout';
import { Header } from '../components/Torrent/Header';
import { VideoList } from '../components/Torrent/VideoList';

function TorrentPage() {
  const router = useRouter();
  const [openShareDrawer, setOpenShareDrawer] = useState(false);

  const torrentSlug = router.query.torrent as string;
  //   const { mutate } = useMutation(shareTorrent, {
  //     onSuccess: data => {
  //       const link = `${window.location.host}/shared/${data}`;
  //       setShareLink(link);
  //     }
  //   });
  const { isError, isLoading, data } = useQuery(
    ['torrent', torrentSlug],
    () => getTorrent(torrentSlug),
    {
      refetchInterval: data => {
        if (data && data.status === 'done') {
          return false;
        }
        if (!data) {
          return false;
        }
        return 1000;
      },
      retry: 3
    }
  );

  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    return <NotFound title="No Torrent Found" />;
  }
  if (isError) {
    return <NotFound title="Somthing went wrong" />;
  }

  return (
    <div>
      <Header data={data} setOpenShareDrawer={setOpenShareDrawer} />

      {data.files.length > 0 && (
        <VideoList videos={data.files} torrentSlug={data.slug} />
      )}
      <Drawer
        opened={openShareDrawer}
        onClose={() => setOpenShareDrawer(false)}
        title="Register"
        padding="xl"
        size="xl"
      >
        {/* Drawer content */}
      </Drawer>
    </div>
  );
}

TorrentPage.getLayout = (page: ReactElement) => (
  <Layout needAuth={true}>{page}</Layout>
);

export default TorrentPage;
