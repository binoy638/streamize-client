import type { ReactElement } from 'react';
import { useEffect } from 'react';

import Loader from '@/components/Common/Loader';
import NotFound from '@/components/Common/NotFound';
import Header from '@/components/Library/Header';
import TorrentList from '@/components/Library/TorrentList';
import {
  TorrentState,
  useTorrentsListQuery,
} from '@/generated/apolloComponents';

import Layout from '../components/Layout';

const Library = () => {
  const { data, loading, error, stopPolling } = useTorrentsListQuery({
    pollInterval: 1000,
  });

  useEffect(() => {
    if (!data) return;
    const allDone = data.torrents.every(
      (torrent) => torrent.status === TorrentState.Done
    );

    if (allDone) {
      stopPolling();
    }
  }, [data]);

  if (loading) return <Loader />;

  if (error || !data) return <NotFound title="Something went wrong" />;

  if (data.torrents.length === 0) return <NotFound title="Library is empty" />;

  return (
    <div className=" relative mt-4 flex flex-col gap-4 overflow-hidden lg:mt-6">
      <Header />

      <TorrentList torrents={data.torrents} />
    </div>
  );
};

Library.getLayout = (page: ReactElement) => (
  <Layout needAuth={true}>{page}</Layout>
);

export default Library;
