/* eslint-disable unicorn/no-nested-ternary */
import { RefreshIcon } from '@heroicons/react/outline';
import {
  CheckIcon,
  ServerIcon,
  TrashIcon,
  XIcon
} from '@heroicons/react/solid';
import { Text } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import Link from 'next/link';
import { useRouter } from 'next/router';
import prettyBytes from 'pretty-bytes';
import React from 'react';
import { useMutation } from 'react-query';

import { deleteTorrent } from '../../API';
import {
  TorrentsListQuery,
  TorrentState
} from '../../generated/apolloComponents';
import useAddMagnet from '../../hooks/useAddMagnet';
import { prettyTime } from '../../utils';
import ItemWithIcon from '../Common/ItemWithIcon';
import TorrentItem from './TorrentItem';

interface TorrentListProps {
  diskUsage: TorrentsListQuery['diskUsage'];
  torrents: TorrentsListQuery['torrents'];
}

function TorrentList({ diskUsage, torrents }: TorrentListProps) {
  const notifications = useNotifications();

  const router = useRouter();

  const { mutate } = useMutation(deleteTorrent, {
    onSuccess: () => {
      notifications.showNotification({
        title: 'Torrent',
        message: 'successfully deleted torrent',
        color: 'teal',
        icon: <CheckIcon className="h-4 w-4" />
      });
    },
    onError: () => {
      notifications.showNotification({
        title: 'Torrent',
        message: 'something went wrong while deleting torrent',
        color: 'red',
        icon: <XIcon className="h-4 w-4" />
      });
    }
  });

  const { mutate: RetryTorrentMutate } = useAddMagnet({
    successMessage: 'Torrent refreshed'
  });

  const deleteTorrentHandler = (slug: string) => {
    mutate(slug);
  };

  const RetryHandler = (magnet: string) => {
    RetryTorrentMutate(magnet);
  };

  return (
    <div className="mt-4 lg:mt-6 flex flex-col gap-4 overflow-hidden text-secondaryText">
      <div className="flex justify-end">
        <ItemWithIcon
          icon={<ServerIcon className="w-4 h-4" />}
          title={`${prettyBytes(diskUsage.free)} / ${prettyBytes(
            diskUsage.size
          )}`}
        />
      </div>

      {torrents.map(torrent => {
        return (
          <TorrentItem
            key={torrent.slug}
            torrent={torrent}
            deleteTorrentHandler={deleteTorrentHandler}
            retryHandler={RetryHandler}
          />
        );
      })}
    </div>
  );
}

export default TorrentList;
