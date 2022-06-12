import {
  ArrowNarrowDownIcon,
  ArrowNarrowRightIcon,
  ArrowNarrowUpIcon,
  CheckIcon,
  ChipIcon,
  ClockIcon,
  CloudDownloadIcon,
  ExclamationCircleIcon,
  FolderIcon,
  SaveIcon,
  ShareIcon
} from '@heroicons/react/outline';
import { Divider, Menu, Paper, Progress, Skeleton, Text } from '@mantine/core';
import prettyBytes from 'pretty-bytes';
import React, { ReactElement } from 'react';
import { MdOutlineQueue } from 'react-icons/md';
import { VscServerProcess } from 'react-icons/vsc';
import { useQuery } from 'react-query';

import { ITorrent, IVideo, TorrentState } from '../@types';
import { getTorrent } from '../API';
import ItemWithIcon from '../components/Common/ItemWithIcon';
import Layout from '../components/Layout';
import { prettyTime } from '../utils';

const TorrentStatus = ({ status }: { status: TorrentState }) => {
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

export const Header = ({ data }: { data: ITorrent }) => {
  return (
    <Paper shadow={'sm'} p={20}>
      <div className="flex justify-end pl-2">
        <MenuItem />
      </div>
      <Text size="xl" weight={'bold'} lineClamp={4}>
        {data.name}
      </Text>
      <div className="py-2  flex gap-6">
        <ItemWithIcon
          title={prettyBytes(data.size)}
          icon={<ChipIcon className="h-4 w-4" />}
        />
        <ItemWithIcon
          title={data.files.length.toString()}
          icon={<FolderIcon className="h-4 w-4" />}
        />
        <TorrentStatus status={data.status} />
      </div>
      {data.status === TorrentState.DOWNLOADING && data.downloadInfo && (
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

const torrentSlug = 'iirul';
function Test() {
  const { isError, isLoading, data } = useQuery(
    ['torrent', torrentSlug],
    () => getTorrent(torrentSlug),
    {
      refetchInterval: data => {
        if (data && data.status === 'done') {
          return false;
        }
        if (!data) {
          return false;
        }
        return 1000;
      },
      retry: 3
    }
  );

  if (isLoading) {
    return (
      <div>
        <Skeleton height={50} mb={10} />
        <Skeleton height={30} />
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="flex-col justify-center items-center ">
          <ExclamationCircleIcon className="h-48 w-48" />
          <Text size="xl" weight={'bold'} align={'center'}>
            No Torrent Found
          </Text>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="flex-col justify-center items-center ">
          <ExclamationCircleIcon className="h-48 w-48" />
          <Text size="xl" weight={'bold'} align={'center'}>
            Something went wrong
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header data={data} />

      {data.files.length > 0 && <VideoList videos={data.files} />}
    </div>
  );
}

Test.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Test;

const VideoList = ({ videos }: { videos: IVideo[] }) => {
  return (
    <Paper mt={10} shadow={'sm'} p={20} withBorder>
      {videos.map((video, index) => {
        return (
          <Paper key={video.slug} withBorder py={10} px={10}>
            <div className="flex gap-2 cursor-pointer items-center ">
              <ArrowNarrowRightIcon className="w-5 h-5" />
              <Text size="md" lineClamp={2}>
                {video.name}
              </Text>
            </div>

            {video.downloadInfo ? (
              <Progress
                color="green"
                size={'lg'}
                label={Math.round(video.downloadInfo.progress * 100) + '%'}
                value={Math.round(video.downloadInfo.progress * 100)}
              />
            ) : video.transcodingPercent < 1 ? (
              <Progress
                color="green"
                size={'lg'}
                label={Math.round(video.transcodingPercent * 100) + '%'}
                value={Math.round(video.transcodingPercent * 100)}
              />
            ) : null}
          </Paper>
        );
      })}
    </Paper>
  );
};

const MenuItem = () => {
  return (
    <Menu>
      <Menu.Item icon={<ShareIcon className="w-4 h-4" />}>Share</Menu.Item>
    </Menu>
  );
};
