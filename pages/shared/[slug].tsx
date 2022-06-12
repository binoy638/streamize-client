import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { Accordion, Skeleton, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { useQuery } from 'react-query';

import { getSharedPlaylist } from '../../API';
import Layout from '../../components/Layout';
import { Header } from '../../components/Torrent/Header';
import { VideoList } from '../../components/Torrent/VideoList';

const SharedPlaylist = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { isError, isLoading, data } = useQuery(['shared', slug], () =>
    getSharedPlaylist(slug as string)
  );

  const handleClick = (videoSlug: string) => {
    router.push({
      pathname: '/shared/stream',
      query: { slug, videoSlug }
    });
  };

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
      <Header data={data.torrent} />
      {data.torrent.files.length > 0 && (
        <VideoList
          videos={data.torrent.files}
          torrentSlug={data.torrent.slug}
        />
      )}
    </div>
  );
};

SharedPlaylist.getLayout = (page: ReactElement) => (
  <Layout needAuth={false}>{page}</Layout>
);

export default SharedPlaylist;
