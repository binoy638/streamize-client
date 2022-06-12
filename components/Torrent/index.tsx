/* eslint-disable sonarjs/cognitive-complexity */
import {
  ArrowNarrowDownIcon,
  ArrowNarrowUpIcon,
  ChipIcon,
  ClockIcon,
  CloudDownloadIcon,
  DownloadIcon,
  FolderIcon,
  SaveIcon
} from '@heroicons/react/outline';
import { Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';

import { ITorrent, TorrentState, VideoState } from '../../@types';
import { getDownloadLink, shareTorrent } from '../../API';
import StatusIndicator from '../Common/StatusIndicator';

function Torrent({ data }: { data: ITorrent }) {
  const router = useRouter();

  const handleClick = (torrentSlug: string, videoSlug: string) => {
    // if (data.status !== 'done') return;
    router.push(`/${torrentSlug}/${videoSlug}`);
  };

  const { mutate } = useMutation(shareTorrent, {
    onSuccess: data => {
      const link = `${window.location.host}/shared/${data}`;
      setShareLink(link);
    }
  });

  const [shareLink, setShareLink] = React.useState('');

  const handleShare = () => {
    mutate({ isTorrent: true, torrent: data._id, mediaId: data._id });
  };

  return data.status === TorrentState.DOWNLOADING ||
    data.status === TorrentState.PROCESSING ||
    data.status === TorrentState.DONE ? (
    <div className="flex flex-col gap-4">
      {/* <div className="justify-center text-xl border-b pb-4">
        <Tag header="Title" value={data.name} />
        <Tag header="Size" value={prettyBytes(data.size)} />
        <Tag header="Status" value={data.status} />
      </div> */}
      <Header />
      <div className="">
        <div className="flex flex-col gap-2">
          {data.files.map(item => {
            return (
              <div
                key={item.slug}
                className="bg-gray-700  rounded  flex flex-col overflow-hidden justify-between "
              >
                <div className="px-2 py-1 flex justify-between items-center">
                  <span
                    className="hover:underline cursor-pointer"
                    onClick={() => handleClick(data.slug, item.slug)}
                  >
                    {item.name}
                  </span>
                  {item.status === VideoState.DOWNLOADING ? (
                    <StatusIndicator type="downloading" />
                  ) : item.status === VideoState.PROCESSING ? (
                    <StatusIndicator type="converting" />
                  ) : item.status === VideoState.DONE ? (
                    <Link href={getDownloadLink(item.slug)} passHref>
                      <a>
                        <DownloadIcon className="h-5 w-5" />
                      </a>
                    </Link>
                  ) : null}
                </div>
                {item.status === VideoState.DOWNLOADING &&
                item?.downloadInfo ? (
                  <div className="w-full bg-gray-200 rounded-full">
                    <div
                      className="bg-green-500 text-xs font-medium text-blue-100 text-center h-1 leading-none "
                      style={{
                        width: `${Math.round(
                          item.downloadInfo?.progress * 100
                        )}%`
                      }}
                    ></div>
                  </div>
                ) : item.status === VideoState.PROCESSING &&
                  item.transcodingPercent ? (
                  <div className="w-full bg-gray-200 rounded-full">
                    <div
                      className="bg-green-500 text-xs font-medium text-blue-100 text-center h-1 leading-none "
                      style={{
                        width: `${Math.round(item.transcodingPercent * 100)}%`
                      }}
                    ></div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <button onClick={handleShare} className="bg-green-400">
          Share
        </button>
        {shareLink && shareLink.length > 0 && <div>{shareLink}</div>}
      </div>
    </div>
  ) : (
    <div>Torrent added, no info yet</div>
  );
}

export default Torrent;

const Tag = ({ header, value }: { header: string; value: string }) => {
  return (
    <div className="flex gap-4">
      <span className="font-bold text-gray-300">{header}:</span>
      <Text lineClamp={4}>
        {value} asdasdaddddddddddddddddddddddddddddddddddddddddddddddddddd
      </Text>
    </div>
  );
};

export const Header = () => {
  return (
    <header>
      <Text size="xl" weight={'bold'} lineClamp={4}>
        The.Unbearable.Weight.of.Massive.Talent.2022.1080p.WEBRip.1400MB.DD5.1.x264-GalaxyRG.mkv
      </Text>
      <div className="py-2  flex gap-6">
        <div className="flex gap-1  items-center">
          <ChipIcon className="h-4 w-4" />
          <Text size="sm">1400MB</Text>
        </div>
        <div className="flex gap-2  items-center">
          <FolderIcon className="h-4 w-4" />
          <Text size="sm">3</Text>
        </div>
        <div className="flex gap-2  items-center">
          <CloudDownloadIcon className="h-4 w-4" />
          <Text size="sm">Downloading</Text>
        </div>
      </div>
      <div className="py-2 border-y-2 flex gap-6">
        <div className="flex gap-2  items-center">
          <ArrowNarrowUpIcon className="h-4 w-4" />
          <Text size="sm"> 12 MB/s</Text>
        </div>
        <div className="flex gap-2  items-center">
          <ArrowNarrowDownIcon className="h-4 w-4" />
          <Text size="sm"> 2 MB/s</Text>
        </div>
        <div className="flex gap-2  items-center">
          <SaveIcon className="h-4 w-4" />
          <Text size="sm"> 70% </Text>
        </div>
        <div className="flex gap-2  items-center">
          <ClockIcon className="h-4 w-4" />
          <Text size="sm"> 50min </Text>
        </div>
      </div>
    </header>
  );
};
