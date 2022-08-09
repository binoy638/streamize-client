import {
  CheckIcon,
  CloudDownloadIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/solid';
import type { FC } from 'react';
import { MdOutlineQueue } from 'react-icons/md';
import { VscServerProcess } from 'react-icons/vsc';

import { TorrentState } from '../../generated/apolloComponents';
import ItemWithIcon from '../Common/ItemWithIcon';

interface TorrentStatusProps {
  status: TorrentState;
}

export const TorrentStatus: FC<TorrentStatusProps> = ({ status }) => {
  switch (status) {
    case TorrentState.Downloading:
      return (
        <ItemWithIcon
          icon={<CloudDownloadIcon className="h-4 w-4" />}
          title="Downloading"
        />
      );
    case TorrentState.Processing:
      return (
        <ItemWithIcon
          icon={<VscServerProcess className="h-4 w-4" />}
          title="Processing"
        />
      );
    case TorrentState.Done:
      return (
        <ItemWithIcon
          icon={<CheckIcon className="h-4 w-4" />}
          title="Completed"
        />
      );
    case TorrentState.Queued:
      return (
        <ItemWithIcon
          icon={<MdOutlineQueue className="h-4 w-4" />}
          title="Queued"
        />
      );
    case TorrentState.Added:
      return (
        <ItemWithIcon
          icon={<MdOutlineQueue className="h-4 w-4" />}
          title="Added"
        />
      );
    default:
      return (
        <ItemWithIcon
          icon={<ExclamationCircleIcon className="h-4 w-4" />}
          title="Error"
        />
      );
  }
};
