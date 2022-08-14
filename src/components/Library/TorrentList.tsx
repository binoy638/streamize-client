import React from 'react';

import useDeleteTorrent from '@/hooks/useDeleteTorrent';

import type { TorrentsListQuery } from '../../generated/apolloComponents';
import useAddMagnet from '../../hooks/useAddMagnet';
import TorrentItem from './TorrentItem';

interface TorrentListProps {
  torrents: TorrentsListQuery['torrents'];
}

function TorrentList({ torrents }: TorrentListProps) {
  const { mutate } = useDeleteTorrent({});

  const { mutate: RetryTorrentMutate } = useAddMagnet({
    successMessage: 'Torrent refreshed',
  });

  const deleteTorrentHandler = (slug: string) => {
    mutate(slug);
  };

  const RetryHandler = (magnet: string) => {
    RetryTorrentMutate({ magnet });
  };

  return (
    <>
      {torrents.map((torrent) => {
        return (
          <TorrentItem
            key={torrent.slug}
            torrent={torrent}
            deleteTorrentHandler={deleteTorrentHandler}
            retryHandler={RetryHandler}
          />
        );
      })}
    </>
  );
}

export default TorrentList;
