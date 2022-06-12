import { ArrowNarrowRightIcon } from '@heroicons/react/solid';
import { Paper, Progress, Text } from '@mantine/core';
import { useRouter } from 'next/router';

import { IVideo } from '../../@types';

export const VideoList = ({
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
