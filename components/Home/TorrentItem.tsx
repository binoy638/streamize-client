import {
  CheckIcon,
  ClockIcon,
  CogIcon,
  DotsHorizontalIcon,
  DownloadIcon,
  ExclamationCircleIcon,
  FilmIcon,
  PlusCircleIcon,
  RefreshIcon,
  SaveIcon,
  ServerIcon,
  TrashIcon,
  ViewBoardsIcon
} from '@heroicons/react/solid';
import { Anchor, Box, Menu, Paper, Progress, Text } from '@mantine/core';
import Link from 'next/link';
import prettyBytes from 'pretty-bytes';
import React from 'react';

import {
  TorrentsListQuery,
  TorrentState
} from '../../generated/apolloComponents';
import { prettyTime } from '../../utils';
import ItemWithIcon from '../Common/ItemWithIcon';

const downloadedSize = (totalSize: number, progress: number) => {
  return prettyBytes(
    Math.round((totalSize / 100) * Math.round(progress * 100))
  );
};

const Attributes = ({
  torrent
}: {
  torrent: TorrentsListQuery['torrents'][0];
}) => {
  if (
    torrent.status === TorrentState.Downloading &&
    torrent.__typename === 'TorrentWithInfoDownload'
  ) {
    return (
      <div className="flex p-4 gap-4 items-center">
        <div>
          <FilmIcon className="w-14 h-14" />
          <div>
            <Progress
              color="green"
              size="xs"
              radius={0}
              value={Math.round(torrent.downloadInfo.progress * 100)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 ">
          <Link href={`/${torrent.slug}`} passHref>
            <Anchor color="dimmed" weight={'bold'} lineClamp={1}>
              {torrent.name}
            </Anchor>
          </Link>
          <div className="flex gap-4 flex-wrap">
            <ItemWithIcon
              icon={<ServerIcon className="w-4 h-4" />}
              title={`${downloadedSize(
                torrent.size,
                torrent.downloadInfo.progress
              )} / ${prettyBytes(torrent.size)}`}
            />
            <ItemWithIcon
              icon={<ClockIcon className="w-4 h-4" />}
              title={prettyTime(torrent.downloadInfo.timeRemaining / 1000)}
            />
            <ItemWithIcon
              icon={<DownloadIcon className="w-4 h-4" />}
              title={prettyBytes(torrent.downloadInfo.downloadSpeed) + '/s'}
            />
            <ItemWithIcon
              icon={<SaveIcon className="w-4 h-4" />}
              title={`Downloading (${Math.round(
                torrent.downloadInfo.progress * 100
              )}%)`}
            />
          </div>
        </div>
      </div>
    );
  }

  if (
    torrent.status === TorrentState.Processing &&
    torrent.__typename === 'TorrentWithInfo'
  ) {
    return (
      <div className="flex p-4 gap-4 items-center">
        <div>
          <FilmIcon className="w-14 h-14" />
        </div>
        <div className="flex flex-col gap-1">
          <Link href={`/${torrent.slug}`} passHref>
            <Anchor color="dimmed" weight={'bold'} lineClamp={1}>
              {torrent.name}
            </Anchor>
          </Link>
          <div className="flex gap-4">
            <ItemWithIcon
              icon={<ServerIcon className="w-4 h-4" />}
              title={prettyBytes(torrent.size)}
            />

            <ItemWithIcon
              icon={<CogIcon className="w-4 h-4" />}
              title={'Processing'}
            />
          </div>
        </div>
      </div>
    );
  }

  if (torrent.status === TorrentState.Added) {
    return (
      <div className="flex p-4 gap-4 items-center">
        <div>
          <FilmIcon className="w-14 h-14" />
        </div>
        <div className="flex flex-col gap-1">
          <Text lineClamp={1}>{torrent.magnet}</Text>
          <div className="flex gap-4">
            <ItemWithIcon
              icon={<PlusCircleIcon className="w-4 h-4" />}
              title={'Added'}
            />
          </div>
        </div>
      </div>
    );
  }

  if (
    torrent.status === TorrentState.Queued &&
    torrent.__typename === 'TorrentWithInfo'
  ) {
    return (
      <div className="flex p-4 gap-4 items-center">
        <div>
          <FilmIcon className="w-14 h-14" />
        </div>
        <div className="flex flex-col gap-1">
          <Link href={`/${torrent.slug}`} passHref>
            <Anchor color="dimmed" weight={'bold'} lineClamp={1}>
              {torrent.name}
            </Anchor>
          </Link>
          <div className="flex gap-4">
            <ItemWithIcon
              icon={<ViewBoardsIcon className="w-4 h-4" />}
              title={'Queued'}
            />
          </div>
        </div>
      </div>
    );
  }

  if (torrent.status === TorrentState.Error) {
    return (
      <div className="flex p-4 gap-4 items-center">
        <div>
          <FilmIcon className="w-14 h-14 text-red-500" />
        </div>
        <div className="flex flex-col gap-1">
          <Text lineClamp={1}>{torrent.magnet}</Text>
          <div className="flex gap-4">
            <ItemWithIcon
              icon={<ExclamationCircleIcon className="w-4 h-4" />}
              title={'Error'}
            />
          </div>
        </div>
      </div>
    );
  }

  if (torrent.__typename === 'TorrentWithInfo') {
    return (
      <div className="flex p-4 gap-4 items-center">
        <div>
          <FilmIcon className="w-14 h-14" />
        </div>
        <div className="flex flex-col gap-1 overflow-hidden pr-2">
          <Link href={`/${torrent.slug}`} passHref>
            <Anchor color="dimmed" weight={'bold'} lineClamp={1}>
              {torrent.name}
            </Anchor>
          </Link>
          <div className="flex gap-4">
            <ItemWithIcon
              icon={<CheckIcon className="w-4 h-4 text-green-500" />}
              title={'Done'}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

interface TorrentItemProps {
  torrent: TorrentsListQuery['torrents'][0];
  deleteTorrentHandler: (slug: string) => void;
  retryHandler: (magnet: string) => void;
}

const TorrentItem = ({
  torrent,
  deleteTorrentHandler,
  retryHandler
}: TorrentItemProps) => {
  return (
    <Paper shadow={'sm'} sx={{ position: 'relative' }}>
      <div className="absolute right-0 p-2">
        <Menu control={<DotsHorizontalIcon className="w-4 h-4" />}>
          <Menu.Item
            onClick={() => deleteTorrentHandler(torrent.slug)}
            icon={<TrashIcon className="w-4 h-4" />}
          >
            Delete
          </Menu.Item>
          <Menu.Item
            onClick={() => retryHandler(torrent.magnet)}
            icon={<RefreshIcon className="w-4 h-4" />}
          >
            Refresh
          </Menu.Item>
        </Menu>
      </div>
      <Attributes torrent={torrent} />
    </Paper>
  );
};

export default TorrentItem;
