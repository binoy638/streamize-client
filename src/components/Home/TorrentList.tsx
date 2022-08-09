import { CheckIcon, ServerIcon, XIcon } from '@heroicons/react/solid';
import { showNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import prettyBytes from 'pretty-bytes';
import React from 'react';

import { deleteTorrent } from '../../API';
import type { TorrentsListQuery } from '../../generated/apolloComponents';
import useAddMagnet from '../../hooks/useAddMagnet';
import ItemWithIcon from '../Common/ItemWithIcon';
import TorrentItem from './TorrentItem';

interface TorrentListProps {
  diskUsage: TorrentsListQuery['diskUsage'];
  torrents: TorrentsListQuery['torrents'];
}

function TorrentList({ diskUsage, torrents }: TorrentListProps) {
  const { mutate } = useMutation(deleteTorrent, {
    onSuccess: () => {
      showNotification({
        title: 'Torrent',
        message: 'successfully deleted torrent',
        color: 'teal',
        icon: <CheckIcon className="h-4 w-4" />,
      });
    },
    onError: () => {
      showNotification({
        title: 'Torrent',
        message: 'something went wrong while deleting torrent',
        color: 'red',
        icon: <XIcon className="h-4 w-4" />,
      });
    },
  });

  const { mutate: RetryTorrentMutate } = useAddMagnet({
    successMessage: 'Torrent refreshed',
  });

  const deleteTorrentHandler = (slug: string) => {
    mutate(slug);
  };

  const RetryHandler = (magnet: string) => {
    RetryTorrentMutate(magnet);
  };

  return (
    <div className=" mt-4 flex flex-col gap-4 overflow-hidden lg:mt-6">
      <div className="flex justify-end">
        <ItemWithIcon
          icon={<ServerIcon className="h-4 w-4" />}
          title={`${prettyBytes(diskUsage.free)} / ${prettyBytes(
            diskUsage.size
          )}`}
        />
      </div>

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
    </div>
  );
}

export default TorrentList;
