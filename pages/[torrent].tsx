import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { Drawer, Skeleton, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import { useQuery } from 'react-query';

import { getTorrent, shareTorrent } from '../API';
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
    return (
      <div>
        <Skeleton height={50} mb={10} />
        <Skeleton height={30} />
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="flex-col justify-center items-center ">
          <ExclamationCircleIcon className="h-48 w-48" />
          <Text size="xl" weight={'bold'} align={'center'}>
            No Torrent Found
          </Text>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="flex-col justify-center items-center ">
          <ExclamationCircleIcon className="h-48 w-48" />
          <Text size="xl" weight={'bold'} align={'center'}>
            Something went wrong
          </Text>
        </div>
      </div>
    );
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
