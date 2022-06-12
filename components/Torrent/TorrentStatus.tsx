import {
  CheckIcon,
  CloudDownloadIcon,
  ExclamationCircleIcon
} from '@heroicons/react/solid';
import { FC } from 'react';
import { MdOutlineQueue } from 'react-icons/md';
import { VscServerProcess } from 'react-icons/vsc';

import { TorrentState } from '../../@types';
import ItemWithIcon from '../Common/ItemWithIcon';

interface TorrentStatusProps {
  status: TorrentState;
}

export const TorrentStatus: FC<TorrentStatusProps> = ({ status }) => {
  switch (status) {
    case TorrentState.DOWNLOADING:
      return (
        <ItemWithIcon
          icon={<CloudDownloadIcon className="h-4 w-4" />}
          title="Downloading"
        />
      );
    case TorrentState.PROCESSING:
      return (
        <ItemWithIcon
          icon={<VscServerProcess className="h-4 w-4" />}
          title="Processing"
        />
      );
    case TorrentState.DONE:
      return (
        <ItemWithIcon
          icon={<CheckIcon className="h-4 w-4" />}
          title="Completed"
        />
      );
    case TorrentState.QUEUED:
      return (
        <ItemWithIcon
          icon={<MdOutlineQueue className="h-4 w-4" />}
          title="Queued"
        />
      );
    case TorrentState.ADDED:
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
