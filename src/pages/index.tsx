import type { ReactElement } from 'react';

import Loader from '@/components/Common/Loader';
import NotFound from '@/components/Common/NotFound';
import Header from '@/components/Library/Header';
import TorrentList from '@/components/Library/TorrentList';
import { useTorrentsListQuery } from '@/generated/apolloComponents';

import Layout from '../components/Layout';

const Library = () => {
  const { data, loading, error } = useTorrentsListQuery({ pollInterval: 1000 });

  if (loading) return <Loader />;

  if (error || !data) return <NotFound title="Something went wrong" />;

  if (data.torrents.length === 0) return <NotFound title="Library is empty" />;

  return (
    <div className=" mt-4 flex flex-col gap-4 overflow-hidden lg:mt-6">
      <Header />

      <TorrentList torrents={data.torrents} />
    </div>
  );
};

Library.getLayout = (page: ReactElement) => (
  <Layout needAuth={true}>{page}</Layout>
);

export default Library;
