import React, { FC } from 'react';

import { IVideo } from '../@types';
import { getPreviewLink, getVideoLink } from '../API';
import { VideoPlayerEvents } from '../utils/videoPlayerEvents';
import VideoJS from '../VideoJs/VideoJs';

interface PlayerProps {
  video: IVideo;
}

const Player: FC<PlayerProps> = ({ video }) => {
  const options = {
    sources: [
      {
        src: getVideoLink(video.slug as string)
      }
    ]
  };

  return (
    <VideoJS
      onReady={VideoPlayerEvents.onReady}
      options={options}
      subtitles={video.subtitles}
      onVolumeChange={VideoPlayerEvents.onVolumeChange}
      progressBarPreviewUrl={
        video.progressPreview
          ? getPreviewLink(video.slug, `${video.slug}.vtt`)
          : undefined
      }
    />
  );
};

export default Player;
