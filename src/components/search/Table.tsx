import { ExclamationCircleIcon, XIcon } from '@heroicons/react/outline';
import { Text, Tooltip } from '@mantine/core';
import { closeAllModals, openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import React from 'react';

import type { Provider, TorrentData } from '@/@types';
import { fetchTorrentMagnet } from '@/API';
import client from '@/graphql/client';
import useAddMagnet from '@/hooks/useAddMagnet';

const isCodecSupported = (name: string) => {
  if (name.includes('x265') || name.includes('HEVC')) {
    return false;
  }
  return true;
};

export const TorrentName = ({ name }: { name: string }) => {
  return (
    <td className={`flex cursor-pointer gap-2  `}>
      {name}

      {!isCodecSupported(name) && (
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
  showUnsupported: boolean;
}

export const TableBody = ({ torrents, showUnsupported }: TableBodyProps) => {
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
          if (link.startsWith('magnet:?xt=urn:btih:')) {
            mutate({ magnet: link });
            return;
          }
          const magnet = await fetchTorrentMagnet(provider, link);
          mutate({ magnet });
        } catch (error) {
          showNotification({
            message: 'Error while fetching magnet link',
            color: 'red',
            icon: <XIcon className="h-4 w-4" />,
          });
          console.log(error);
        }
      },
    });
  };
  return (
    <tbody>
      {torrents.map((torrent, index) => {
        if (!showUnsupported && !isCodecSupported(torrent.name)) return null;
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
