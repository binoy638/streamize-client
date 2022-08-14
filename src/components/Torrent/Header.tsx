import {
  ArrowNarrowDownIcon,
  ArrowNarrowUpIcon,
  ClockIcon,
  FolderIcon,
  SaveIcon,
  ServerIcon,
} from '@heroicons/react/solid';
import { Paper, Text } from '@mantine/core';
import prettyBytes from 'pretty-bytes';

import type { TorrentQuery } from '../../generated/apolloComponents';
import { TorrentState } from '../../generated/apolloComponents';
import { prettyTime } from '../../utils';
import ItemWithIcon from '../Common/ItemWithIcon';
import { ExtraOptions } from './ExtraOptions';
import { TorrentStatus } from './TorrentStatus';

interface HeaderProps {
  data: TorrentQuery['torrent'];
  showExtraOptions?: boolean;
}

export const Header = ({ data, showExtraOptions }: HeaderProps) => {
  if (data.__typename === 'TorrentWithoutInfo') {
    return (
      <Paper shadow={'sm'} p={20}>
        {showExtraOptions && (
          <div className="flex justify-end pl-2">
            <ExtraOptions torrentId={data._id} slug={data.slug} />
          </div>
        )}

        <Text size="xl" weight={'bold'} lineClamp={4}>
          {data.magnet}
        </Text>
        <div className="flex  gap-6 py-2">
          <TorrentStatus status={data.status} />
        </div>
      </Paper>
    );
  }

  if (data.__typename === 'TorrentWithInfoDownload') {
    return (
      <Paper shadow={'sm'} p={20}>
        {showExtraOptions && (
          <div className="flex justify-end pl-2">
            <ExtraOptions torrentId={data._id} slug={data.slug} />
          </div>
        )}

        <Text size="xl" weight={'bold'} lineClamp={4}>
          {data.name}
        </Text>
        <div className="flex  gap-6 py-2">
          <ItemWithIcon
            title={data?.size ? prettyBytes(data.size) : '??'}
            icon={<ServerIcon className="h-4 w-4" />}
          />
          <ItemWithIcon
            title={data.files.length.toString()}
            icon={<FolderIcon className="h-4 w-4" />}
          />
          <TorrentStatus status={data?.status || TorrentState.Queued} />
        </div>
        {data.status === TorrentState.Downloading && data.downloadInfo && (
          <div className="flex gap-6  py-2">
            <ItemWithIcon
              title={prettyBytes(data.downloadInfo.downloadSpeed)}
              icon={<ArrowNarrowDownIcon className="h-4 w-4" />}
            />
            <ItemWithIcon
              title={prettyBytes(data.downloadInfo.uploadSpeed)}
              icon={<ArrowNarrowUpIcon className="h-4 w-4" />}
            />

            <ItemWithIcon
              title={`${Math.round(data.downloadInfo.progress * 100)}%`}
              icon={<SaveIcon className="h-4 w-4" />}
            />
            <ItemWithIcon
              title={
                data.downloadInfo?.timeRemaining
                  ? prettyTime(data.downloadInfo.timeRemaining / 1000)
                  : 'NA'
              }
              icon={<ClockIcon className="h-4 w-4" />}
            />
          </div>
        )}
      </Paper>
    );
  }
  if (data.__typename === 'TorrentWithInfo') {
    return (
      <Paper shadow={'sm'} p={20}>
        {showExtraOptions && (
          <div className="flex justify-end pl-2">
            <ExtraOptions torrentId={data._id} slug={data.slug} />
          </div>
        )}

        <Text size="xl" weight={'bold'} lineClamp={4}>
          {data.name}
        </Text>
        <div className="flex  gap-6 py-2">
          <ItemWithIcon
            title={data?.size ? prettyBytes(data.size) : '??'}
            icon={<ServerIcon className="h-4 w-4" />}
          />
          <ItemWithIcon
            title={data.files.length.toString()}
            icon={<FolderIcon className="h-4 w-4" />}
          />
          <TorrentStatus status={data?.status || TorrentState.Queued} />
        </div>
      </Paper>
    );
  }
  return null;
};
