import React, { FC, useCallback } from 'react';
import { VideoJsPlayer } from 'video.js';

import { IVideo } from '../@types';
import { getPreviewLink, getVideoLink } from '../API';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { setProgress } from '../store/slice/player.slice';
import { VideoPlayerEvents } from '../utils/videoPlayerEvents';
import VideoJS from '../VideoJs/VideoJs';

interface PlayerProps {
  video: IVideo;
}

const Player: FC<PlayerProps> = ({ video }) => {
  const dispatch = useTypedDispatch();

  const options = {
    sources: [
      {
        src: getVideoLink(video.slug as string)
      }
    ]
  };

  const onReady = useCallback((player: videojs.VideoJsPlayer) => {
    const savedVolume = localStorage.getItem('volume');
    if (savedVolume && (savedVolume === '0' || Number(savedVolume))) {
      player.volume(Number(savedVolume));
    }

    const currentTime = localStorage.getItem(`${video.slug}-currentTime`);
    if (currentTime) {
      player.currentTime(Number(currentTime));
    }
  }, []);

  const onTimeUpdate = useCallback((player: VideoJsPlayer) => {
    const currentTime = Math.round(player.currentTime());
    if (currentTime % 5 === 0) {
      const key = `${video.slug}-currentTime`;
      localStorage.setItem(key, currentTime.toString());
    }
  }, []);

  return (
    <VideoJS
      onReady={onReady}
      options={options}
      subtitles={video.subtitles}
      onTimeUpdate={onTimeUpdate}
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
