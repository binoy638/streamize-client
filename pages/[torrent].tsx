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
  ShareIcon,
  TrashIcon
} from '@heroicons/react/outline';
import { Drawer, Menu, Paper, Progress, Skeleton, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import prettyBytes from 'pretty-bytes';
import React, { ReactElement, useState } from 'react';
import { MdOutlineQueue } from 'react-icons/md';
import { VscServerProcess } from 'react-icons/vsc';
import { useMutation, useQuery } from 'react-query';

import { ITorrent, IVideo, TorrentState } from '../@types';
import { getTorrent, shareTorrent } from '../API';
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

export const Header = ({
  data,
  setOpenShareDrawer
}: {
  data: ITorrent;
  setOpenShareDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Paper shadow={'sm'} p={20}>
      <div className="flex justify-end pl-2">
        <MenuItem setOpenShareDrawer={setOpenShareDrawer} />
      </div>
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

function TorrentPage() {
  const router = useRouter();
  const [openShareDrawer, setOpenShareDrawer] = useState(false);

  const torrentSlug = router.query.torrent as string;
  //   const { mutate } = useMutation(shareTorrent, {
  //     onSuccess: data => {
  //       const link = `${window.location.host}/shared/${data}`;
  //       setShareLink(link);
  //     }
  //   });
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
      <Header data={data} setOpenShareDrawer={setOpenShareDrawer} />

      {data.files.length > 0 && (
        <VideoList videos={data.files} torrentSlug={data.slug} />
      )}
      <Drawer
        opened={openShareDrawer}
        onClose={() => setOpenShareDrawer(false)}
        title="Register"
        padding="xl"
        size="xl"
      >
        {/* Drawer content */}
      </Drawer>
    </div>
  );
}

TorrentPage.getLayout = (page: ReactElement) => (
  <Layout needAuth={true}>{page}</Layout>
);

export default TorrentPage;

const VideoList = ({
  videos,
  torrentSlug
}: {
  videos: IVideo[];
  torrentSlug: string;
}) => {
  const router = useRouter();

  const handleClick = (tSlug: string, vSlug: string) => {
    // if (data.status !== 'done') return;
    router.push(`/${tSlug}/${vSlug}`);
  };
  return (
    <Paper mt={10} shadow={'sm'} p={20} withBorder>
      {videos.map(video => {
        return (
          <Paper key={video.slug} withBorder py={10} px={10}>
            <div
              className="flex gap-2 cursor-pointer items-center "
              onClick={() => handleClick(torrentSlug, video.slug)}
            >
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

const MenuItem = ({
  setOpenShareDrawer
}: {
  setOpenShareDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Menu>
      <Menu.Item
        icon={<ShareIcon className="w-4 h-4" />}
        onClick={() => setOpenShareDrawer(true)}
      >
        Share
      </Menu.Item>
      <Menu.Item color="red" icon={<TrashIcon className="w-4 h-4" />}>
        Delete
      </Menu.Item>
    </Menu>
  );
};
