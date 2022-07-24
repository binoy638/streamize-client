import { ArrowNarrowRightIcon } from '@heroicons/react/solid';
import { Paper, Progress, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { TorrentQuery } from '../../generated/apolloComponents';

interface VideoListProps {
  torrent: TorrentQuery['torrent'];
  torrentSlug: string;
  sharedSlug?: string;
}

export const VideoList: FC<VideoListProps> = ({
  torrent,
  torrentSlug,
  sharedSlug
}) => {
  const router = useRouter();

  const handleClick = (vSlug: string) => {
    if (sharedSlug) {
      router.push({
        pathname: '/shared/[slug]/[videoSlug]',
        query: { slug: sharedSlug, videoSlug: vSlug }
      });
    } else {
      router.push(`/${torrentSlug}/${vSlug}`);
    }
  };

  if (
    torrent.__typename === 'TorrentWithInfo' ||
    torrent.__typename === 'TorrentWithInfoDownload'
  ) {
    return (
      <Paper mt={10} shadow={'sm'} p={20} withBorder>
        {torrent.files.map(video => {
          return (
            <Paper key={video.slug} withBorder py={10} px={10}>
              <div
                className="flex gap-2 cursor-pointer items-center "
                onClick={() => handleClick(video.slug)}
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
  }

  return null;
};
