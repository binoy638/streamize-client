/* eslint-disable unicorn/no-nested-ternary */
import React from 'react';
import { useQuery } from 'react-query';

import { getAddedTorrents } from '../../API';
import Empty from './Empty';
import Error from './Error';
import Loading from './Loading';
import TorrentList from './TorrentList';

function AddedTorrentList() {
  const { data, isLoading, error } = useQuery(
    'addedTorrents',
    () => getAddedTorrents(),
    {
      refetchInterval: data =>
        data && data?.torrents?.length > 0 ? 1000 : false
    }
  );
  return isLoading ? (
    <Loading />
  ) : error ? (
    <Error />
  ) : (
    <>
      {data?.torrents && data.torrents.length > 0 ? (
        <TorrentList data={data.torrents} diskSpace={data.diskSpace} />
      ) : (
        <Empty />
      )}
    </>
  );
}

export default AddedTorrentList;
