import {
  CheckIcon,
  ClockIcon,
  CogIcon,
  DotsVerticalIcon,
  DownloadIcon,
  ExclamationCircleIcon,
  FilmIcon,
  PlusCircleIcon,
  RefreshIcon,
  SaveIcon,
  ServerIcon,
  TrashIcon,
  ViewBoardsIcon,
} from '@heroicons/react/solid';
import { Anchor, Menu, Paper, Progress, Text } from '@mantine/core';
import Link from 'next/link';
import prettyBytes from 'pretty-bytes';
import type { ReactNode } from 'react';
import React from 'react';

import type { TorrentsListQuery } from '../../generated/apolloComponents';
import { TorrentState } from '../../generated/apolloComponents';
import { prettyTime } from '../../utils';
import ItemWithIcon from '../Common/ItemWithIcon';

const downloadedSize = (totalSize: number, progress: number) => {
  return prettyBytes(
    Math.round((totalSize / 100) * Math.round(progress * 100))
  );
};

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <div className="flex items-center gap-4 px-4 pb-4">{children}</div>;
};

const Attributes = ({
  torrent,
}: {
  torrent: TorrentsListQuery['torrents'][0];
}) => {
  if (
    torrent.status === TorrentState.Downloading &&
    torrent.__typename === 'TorrentWithInfoDownload'
  ) {
    return (
      <Wrapper>
        <div>
          <FilmIcon className="h-14 w-14" />
          <div>
            <Progress
              color="green"
              size="xs"
              radius={0}
              value={Math.round(torrent.downloadInfo.progress * 100)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 overflow-hidden">
          <Link href={`/${torrent.slug}`} passHref>
            <Anchor color="dimmed" weight={'bold'} lineClamp={1}>
              {torrent.name}
            </Anchor>
          </Link>
          <div className="flex flex-wrap gap-4">
            <ItemWithIcon
              icon={<ServerIcon className="h-4 w-4" />}
              title={`${downloadedSize(
                torrent.size,
                torrent.downloadInfo.progress
              )} / ${prettyBytes(torrent.size)}`}
            />
            <ItemWithIcon
              icon={<ClockIcon className="h-4 w-4" />}
              title={prettyTime(torrent.downloadInfo.timeRemaining / 1000)}
            />
            <ItemWithIcon
              icon={<DownloadIcon className="h-4 w-4" />}
              title={`${prettyBytes(torrent.downloadInfo.downloadSpeed)}/s`}
            />
            <ItemWithIcon
              icon={<SaveIcon className="h-4 w-4" />}
              title={`Downloading (${Math.round(
                torrent.downloadInfo.progress * 100
              )}%)`}
            />
          </div>
        </div>
      </Wrapper>
    );
  }

  if (
    torrent.status === TorrentState.Processing &&
    torrent.__typename === 'TorrentWithInfo'
  ) {
    return (
      <Wrapper>
        <div>
          <FilmIcon className="h-14 w-14" />
        </div>
        <div className="flex flex-col gap-1 overflow-hidden">
          <Link href={`/${torrent.slug}`} passHref>
            <Anchor color="dimmed" weight={'bold'} lineClamp={1}>
              {torrent.name}
            </Anchor>
          </Link>
          <div className="flex gap-4">
            <ItemWithIcon
              icon={<ServerIcon className="h-4 w-4" />}
              title={prettyBytes(torrent.size)}
            />

            <ItemWithIcon
              icon={<CogIcon className="h-4 w-4" />}
              title={'Processing'}
            />
          </div>
        </div>
      </Wrapper>
    );
  }

  if (torrent.status === TorrentState.Added) {
    return (
      <Wrapper>
        <div>
          <FilmIcon className="h-14 w-14" />
        </div>
        <div className="flex flex-col gap-1 overflow-hidden">
          <Text lineClamp={1}>{torrent.magnet}</Text>
          <div className="flex gap-4">
            <ItemWithIcon
              icon={<PlusCircleIcon className="h-4 w-4" />}
              title={'Added'}
            />
          </div>
        </div>
      </Wrapper>
    );
  }

  if (
    torrent.status === TorrentState.Queued &&
    torrent.__typename === 'TorrentWithInfo'
  ) {
    return (
      <Wrapper>
        <div>
          <FilmIcon className="h-14 w-14" />
        </div>
        <div className="flex flex-col gap-1 overflow-hidden">
          <Link href={`/${torrent.slug}`} passHref>
            <Anchor color="dimmed" weight={'bold'} lineClamp={1}>
              {torrent.name}
            </Anchor>
          </Link>
          <div className="flex gap-4">
            <ItemWithIcon
              icon={<ViewBoardsIcon className="h-4 w-4" />}
              title={'Queued'}
            />
          </div>
        </div>
      </Wrapper>
    );
  }

  if (torrent.status === TorrentState.Error) {
    return (
      <Wrapper>
        <div>
          <FilmIcon className="h-14 w-14 text-red-500" />
        </div>
        <div className="flex flex-col gap-1 overflow-hidden">
          <Text lineClamp={1}>{torrent.magnet}</Text>
          <div className="flex gap-4">
            <ItemWithIcon
              icon={<ExclamationCircleIcon className="h-4 w-4" />}
              title={'Error'}
            />
          </div>
        </div>
      </Wrapper>
    );
  }

  if (torrent.__typename === 'TorrentWithInfo') {
    return (
      <Wrapper>
        <div>
          <FilmIcon className="h-14 w-14" />
        </div>
        <div className="flex flex-col gap-1 overflow-hidden pr-2">
          <Link href={`/${torrent.slug}`} passHref>
            <Anchor color="dimmed" weight={'bold'} lineClamp={1}>
              {torrent.name}
            </Anchor>
          </Link>
          <div className="flex gap-4">
            <ItemWithIcon
              icon={<CheckIcon className="h-4 w-4 text-green-500" />}
              title={'Done'}
            />
          </div>
        </div>
      </Wrapper>
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
  retryHandler,
}: TorrentItemProps) => {
  return (
    <Paper shadow="sm">
      <div className="flex justify-end p-1">
        <Menu position="bottom-end">
          <Menu.Target>
            <DotsVerticalIcon className="h-4 w-4 cursor-pointer " />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => retryHandler(torrent.magnet)}
              icon={<RefreshIcon className="h-4 w-4" />}
            >
              Refresh
            </Menu.Item>
            <Menu.Item
              onClick={() => deleteTorrentHandler(torrent.slug)}
              icon={<TrashIcon className="h-4 w-4" />}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <Attributes torrent={torrent} />
    </Paper>
  );
};

export default TorrentItem;
