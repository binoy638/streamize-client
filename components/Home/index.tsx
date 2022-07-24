/* eslint-disable unicorn/no-nested-ternary */
import React from 'react';

import { useTorrentsListQuery } from '../../generated/apolloComponents';
import Empty from './Empty';
import Error from './Error';
import Loading from './Loading';
import TorrentList from './TorrentList';

function AddedTorrentList() {
  const { data, loading, error } = useTorrentsListQuery({ pollInterval: 1000 });

  if (loading) return <Loading />;

  if (error || !data) return <Error />;

  if (data.torrents.length === 0) return <Empty />;

  return <TorrentList diskUsage={data.diskUsage} torrents={data.torrents} />;
}

export default AddedTorrentList;
