import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { Tooltip } from '@mantine/core';
import React, { useMemo } from 'react';

import type { TorrentData } from '@/@types';

export const TorrentName = ({ name }: { name: string }) => {
  const notSupported = useMemo(() => {
    if (name.includes('x265') || name.includes('HEVC')) {
      return true;
    }
    return false;
  }, [name]);

  return (
    <td
      className={`flex cursor-pointer gap-2 ${notSupported && 'text-red-500'} `}
    >
      {name}

      {notSupported && (
        <Tooltip
          label="Unsupported media detected, processing duration will be high."
          color="red"
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
  return (
    <tbody>
      {torrents.map((torrent, index) => {
        return (
          <tr key={torrent.name + index}>
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
