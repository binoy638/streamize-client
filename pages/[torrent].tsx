/* eslint-disable unicorn/no-nested-ternary */
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useQuery } from 'react-query';

import { getTorrent } from '../API';
import Layout from '../components/Layout';
import Torrent from '../components/Torrent';

const TorrentPage = () => {
  const router = useRouter();

  const torrentSlug = router.query.torrent as string;

  const { isError, isLoading, data } = useQuery(
    ['torrent', torrentSlug],
    () => getTorrent(torrentSlug),
    {
      refetchInterval: data => {
        return data && data.status === 'done' ? 0 : 1000;
      }
    }
  );

  return (
    <>
      <Head>
        <title>Streamize</title>
      </Head>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error</div>
        ) : (
          <div>{data && <Torrent data={data} />}</div>
        )}
      </div>
    </>
  );
};

TorrentPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default TorrentPage;
