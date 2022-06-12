import { Accordion, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { useQuery } from 'react-query';

import { getSharedPlaylist } from '../../API';
import Layout from '../../components/Layout';

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

  return (
    <div>
      <div className="font-bold text-lg border-b pb-4">Playlist</div>
      {isLoading || isError || !data ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Accordion>
            <Accordion.Item label={data.torrent.name}>
              {data.torrent.files.map(file => {
                return (
                  <div
                    className="my-2 cursor-pointer"
                    onClick={() => handleClick(file.slug)}
                    key={file.slug}
                  >
                    <Text lineClamp={2}>{file.name}</Text>
                  </div>
                );
              })}
            </Accordion.Item>
          </Accordion>
        </div>
      )}
    </div>
  );
};

SharedPlaylist.getLayout = (page: ReactElement) => (
  <Layout needAuth={false}>{page}</Layout>
);

export default SharedPlaylist;
