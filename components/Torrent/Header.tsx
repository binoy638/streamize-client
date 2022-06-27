import {
  ArrowNarrowDownIcon,
  ArrowNarrowUpIcon,
  ChipIcon,
  ClockIcon,
  FolderIcon,
  SaveIcon
} from '@heroicons/react/solid';
import { Paper, Text } from '@mantine/core';
import prettyBytes from 'pretty-bytes';
import { FC } from 'react';

import { TorrentQuery, TorrentState } from '../../generated/apolloComponents';
import { prettyTime } from '../../utils';
import ItemWithIcon from '../Common/ItemWithIcon';
import { ExtraOptions } from './ExtraOptions';
import { TorrentStatus } from './TorrentStatus';

interface HeaderProps {
  data: TorrentQuery['torrent'];
  showExtraOptions?: boolean;
}

export const Header: FC<HeaderProps> = ({ data, showExtraOptions }) => {
  return (
    <Paper shadow={'sm'} p={20}>
      {showExtraOptions && (
        <div className="flex justify-end pl-2">
          <ExtraOptions torrentId={data._id} />
        </div>
      )}

      <Text size="xl" weight={'bold'} lineClamp={4}>
        {data.name}
      </Text>
      <div className="py-2  flex gap-6">
        <ItemWithIcon
          title={data?.size ? prettyBytes(data.size) : '??'}
          icon={<ChipIcon className="h-4 w-4" />}
        />
        <ItemWithIcon
          title={data.files.length.toString()}
          icon={<FolderIcon className="h-4 w-4" />}
        />
        <TorrentStatus status={data?.status || TorrentState.Queued} />
      </div>
      {data.status === TorrentState.Downloading && data.downloadInfo && (
        <div className="py-2 border-y-2 flex gap-6">
          <ItemWithIcon
            title={prettyBytes(data.downloadInfo.downloadSpeed)}
            icon={<ArrowNarrowDownIcon className="h-4 w-4" />}
          />
          <ItemWithIcon
            title={prettyBytes(data.downloadInfo.uploadSpeed)}
            icon={<ArrowNarrowUpIcon className="h-4 w-4" />}
          />

          <ItemWithIcon
            title={Math.round(data.downloadInfo.progress * 100) + '%'}
            icon={<SaveIcon className="h-4 w-4" />}
          />
          <ItemWithIcon
            title={prettyTime(data.downloadInfo.timeRemaining / 1000)}
            icon={<ClockIcon className="h-4 w-4" />}
          />
        </div>
      )}
    </Paper>
  );
};
