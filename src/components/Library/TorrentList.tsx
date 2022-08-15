import { Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
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
    openConfirmModal({
      children: (
        <Text size="sm">Are you sure you want to delete this torrent?</Text>
      ),
      withCloseButton: false,
      labels: { confirm: 'Yes', cancel: 'No' },
      centered: true,
      onConfirm: () => {
        mutate(slug);
      },
    });
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
