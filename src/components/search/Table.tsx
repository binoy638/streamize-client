import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { Text, Tooltip } from '@mantine/core';
import { closeAllModals, openConfirmModal } from '@mantine/modals';
import React, { useMemo } from 'react';

import type { Provider, TorrentData } from '@/@types';
import { fetchTorrentMagnet } from '@/API';
import client from '@/graphql/client';
import useAddMagnet from '@/hooks/useAddMagnet';

export const TorrentName = ({ name }: { name: string }) => {
  const notSupported = useMemo(() => {
    if (name.includes('x265') || name.includes('HEVC')) {
      return true;
    }
    return false;
  }, [name]);

  return (
    <td className={`flex cursor-pointer gap-2  `}>
      {name}

      {notSupported && (
        <Tooltip
          label="Unsupported media detected, processing duration will be high."
          withArrow
        >
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
        </Tooltip>
      )}
    </td>
  );
};

interface TableBodyProps {
  torrents: TorrentData[];
}

export const TableBody = ({ torrents }: TableBodyProps) => {
  const { mutate } = useAddMagnet({
    successMessage: 'Torrent successfully added to queue',
    onSuccessAction: () => {
      closeAllModals();
      client.clearStore();
    },
  });

  const handleClick = (link: string, provider: Provider) => {
    openConfirmModal({
      children: (
        <Text size="sm">Are you sure you want to add this torrent?</Text>
      ),

      labels: { confirm: 'Yes', cancel: 'No' },
      centered: true,
      onConfirm: async () => {
        try {
          const magnet = await fetchTorrentMagnet(provider, link);
          mutate({ magnet });
        } catch (error) {
          console.log(error);
        }
      },
    });
  };
  return (
    <tbody>
      {torrents.map((torrent, index) => {
        return (
          <tr
            key={torrent.name + index}
            onClick={() => handleClick(torrent.link, torrent.provider)}
          >
            <TorrentName name={torrent.name} />
            <td style={{ minWidth: '5rem' }}>{torrent.size}</td>
            <td>{torrent.seeds}</td>
            <td>{torrent.leeches}</td>
            <td style={{ minWidth: '10rem' }}>
              {new Date(torrent.added * 1000).toDateString()}
            </td>
            <td>{torrent.uploader}</td>
          </tr>
        );
      })}
    </tbody>
  );
};
