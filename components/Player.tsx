import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { VideoJsPlayer } from 'video.js';

import { IVideo } from '../@types';
import { getPreviewLink, getSharedVideoLink, getVideoLink } from '../API';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { setProgress } from '../store/slice/player.slice';
import { postVideoProgress } from '../store/thunk/player.thunk';
import VideoJS from '../VideoJs/VideoJs';

interface PlayerProps {
  video: IVideo;
  shareSlug?: string;
  seekTo?: number;
}

const Player: FC<PlayerProps> = ({ video, shareSlug, seekTo }) => {
  const dispatch = useTypedDispatch();

  const {
    progressTracker: { nextUpdateTime }
  } = useTypedSelector(state => state.player);

  const { user } = useTypedSelector(state => state.user);

  useEffect(() => {
    //* If time is 0 then no need to update progress
    if (nextUpdateTime === 0 || !video.slug) return;

    //* If user is logged in then update progress in the server
    if (user.id) {
      dispatch(
        postVideoProgress({ videoSlug: video.slug, progress: nextUpdateTime })
      );
      return;
    }
    //* If user is not logged in then update progress in the local storage
    const key = `${video.slug}-progress`;
    localStorage.setItem(key, nextUpdateTime.toString());
  }, [nextUpdateTime, video.slug, dispatch, user.id]);

  const options = useMemo(
    () => ({
      sources: [
        {
          src: shareSlug
            ? getSharedVideoLink(shareSlug, video.slug)
            : getVideoLink(video.slug)
        }
      ]
    }),
    [shareSlug, video.slug]
  );

  const onReady = useCallback(
    (player: videojs.VideoJsPlayer) => {
      const savedVolume = localStorage.getItem('volume');
      if (savedVolume && (savedVolume === '0' || Number(savedVolume))) {
        player.volume(Number(savedVolume));
      }

      const savedProgress = localStorage.getItem(`${video.slug}-progress`);
      if (savedProgress) {
        player.currentTime(Number(savedProgress));
      }
    },
    [video.slug]
  );

  const onTimeUpdate = useCallback(
    (player: VideoJsPlayer) => {
      const currentTime = Math.round(player.currentTime());
      dispatch(setProgress(currentTime));
    },
    [dispatch]
  );

  const onVolumeChange = useCallback((player: videojs.VideoJsPlayer) => {
    localStorage.setItem('volume', player.volume().toString());
  }, []);

  return (
    <VideoJS
      onReady={onReady}
      options={options}
      seekTo={seekTo}
      subtitles={video.subtitles}
      onTimeUpdate={onTimeUpdate}
      onVolumeChange={onVolumeChange}
      progressBarPreviewUrl={
        video.progressPreview
          ? getPreviewLink(video.slug, `${video.slug}.vtt`)
          : undefined
      }
    />
  );
};

export default Player;
