/* eslint-disable unicorn/no-nested-ternary */
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { getTorrent } from '../API';
import Torrent from '../components/Torrent';

const TorrentPage: NextPage = () => {
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

export default TorrentPage;
