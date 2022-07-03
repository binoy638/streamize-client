import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { VideoJsPlayer } from 'video.js';

import { IVideo } from '../@types';
import { getPreviewLink, getSharedVideoLink, getVideoLink } from '../API';
import { VideoQuery } from '../generated/apolloComponents';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import SyncStream from '../lib/SyncStream';
import { setProgress } from '../store/slice/player.slice';
import { postVideoProgress } from '../store/thunk/player.thunk';
import VideoJS from '../VideoJs/VideoJs';

interface PlayerProps {
  video: VideoQuery['video'];
  shareSlug?: string;
  seekTo?: number;
  isHost?: boolean;
}

const Player: FC<PlayerProps> = ({ video, shareSlug, seekTo, isHost }) => {
  const dispatch = useTypedDispatch();

  // const socket = useSocket();

  const {
    progressTracker: { nextUpdateTime }
  } = useTypedSelector(state => state.player);

  const { user } = useTypedSelector(state => state.user);

  useEffect(() => {
    //! check if its a sync stream
    // if (shareSlug) return;

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
  }, [nextUpdateTime, video.slug, dispatch, user.id, shareSlug]);

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

  const onReady = useCallback((player: videojs.VideoJsPlayer) => {
    // if (shareSlug) {
    //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //   const socket = io(process.env.NEXT_PUBLIC_BASE_URL!);

    //   const host = isHost ? true : false;
    //   new SyncStream(io, socket, player, host, shareSlug);
    // }

    //* Restore volume from local storage
    const savedVolume = localStorage.getItem('volume');
    if (savedVolume && (savedVolume === '0' || Number(savedVolume))) {
      player.volume(Number(savedVolume));
    }
  }, []);

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
