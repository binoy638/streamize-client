import { PlayIcon, XIcon } from '@heroicons/react/solid';
import { Paper, Progress, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import type { TorrentQuery, Video } from '../../generated/apolloComponents';
import { VideoState } from '../../generated/apolloComponents';

const VideoDownloadProgress = ({ video }: { video: Video }) => {
  if (video.downloadInfo) {
    return (
      <Progress
        color="green"
        size={'lg'}
        label={`${Math.round(video.downloadInfo.progress * 100)}%`}
        value={Math.round(video.downloadInfo.progress * 100)}
      />
    );
  }

  if (video.transcodingPercent < 1) {
    <Progress
      color="green"
      size={'lg'}
      label={`${Math.round(video.transcodingPercent * 100)}%`}
      value={Math.round(video.transcodingPercent * 100)}
    />;
  }
  return null;
};

interface VideoListProps {
  torrent: TorrentQuery['torrent'];
  torrentSlug: string;
  sharedSlug?: string;
}

export const VideoList: FC<VideoListProps> = ({
  torrent,
  torrentSlug,
  sharedSlug,
}) => {
  const router = useRouter();

  const handleClick = (vSlug: string, status: VideoState) => {
    if (sharedSlug) {
      router.push({
        pathname: '/shared/[slug]/[videoSlug]',
        query: { slug: sharedSlug, videoSlug: vSlug },
      });
    } else {
      if (status !== VideoState.Done) {
        showNotification({
          message: 'Video is not ready to play.',
          color: 'red',
          icon: <XIcon className="h-4 w-4" />,
        });
        return;
      }
      router.push(`/${torrentSlug}/${vSlug}`);
    }
  };

  if (
    torrent.__typename === 'TorrentWithInfo' ||
    torrent.__typename === 'TorrentWithInfoDownload'
  ) {
    return (
      <Paper mt={10} shadow={'sm'} p={20} withBorder>
        {torrent.files.map((video) => {
          return (
            <div key={video.slug}>
              <div
                className="flex cursor-pointer items-center gap-2 "
                onClick={() => handleClick(video.slug, video.status)}
              >
                <PlayIcon className="h-5 w-5" />
                <Text size="md" lineClamp={2}>
                  {video.name}
                </Text>
              </div>

              <VideoDownloadProgress video={video as Video} />
            </div>
          );
        })}
      </Paper>
    );
  }

  return null;
};
