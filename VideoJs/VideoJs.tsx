/* eslint-disable sonarjs/cognitive-complexity */
import 'video.js/dist/video-js.css';
import 'videojs-seek-buttons';
import 'videojs-seek-buttons/dist/videojs-seek-buttons.css';
import 'videojs-mobile-ui/dist/videojs-mobile-ui.css';
import 'videojs-mobile-ui';
import './plugins/videojs-vtt-thumbnails';
import './plugins/videojs-draggable-seekbar/videojs-draggable-seekbar';

import React from 'react';
import videojs from 'video.js';

import { ISubtitle } from '../@types';

const englishLanguageCodes = new Set([
  'en',
  'en-us',
  'en-gb',
  'eng',
  'english'
]);

const defaultOptions: videojs.PlayerOptions = {
  controls: true,
  responsive: true,
  fluid: true,
  liveui: true,
  html5: {
    vhs: {
      withCredentials: true
    }
  }
};

export const VideoJS = ({
  options,
  subtitles = [],
  seekTo,
  progressBarPreviewUrl,
  onReady,
  onTimeUpdate,
  onPlay,
  onPause,
  onEnded,
  onError,
  onLoadedData,
  onSeeked,
  onSeeking,
  onVolumeChange,
  onLoadedMetadata,
  onPlaying,
  onDispose,
  onWaiting
}: {
  options: videojs.PlayerOptions;
  progressBarPreviewUrl: string | undefined;
  seekTo?: number;
  onReady?: (player: videojs.Player) => void;
  onTimeUpdate?: (player: videojs.Player) => void;
  onPlay?: (player: videojs.Player) => void;
  onPause?: (player: videojs.Player) => void;
  onWaiting?: (player: videojs.Player) => void;
  onPlaying?: (player: videojs.Player) => void;
  onSeeking?: (player: videojs.Player) => void;
  onSeeked?: (player: videojs.Player) => void;
  onEnded?: (player: videojs.Player) => void;
  onError?: (player: videojs.Player) => void;
  onVolumeChange?: (player: videojs.Player) => void;
  onLoadedMetadata?: (player: videojs.Player) => void;
  onLoadedData?: (player: videojs.Player) => void;
  onDispose?: (player: videojs.Player) => void;
  subtitles: ISubtitle[];
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const playerRef = React.useRef<videojs.Player | null>();

  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(
        videoElement,
        { ...defaultOptions, ...options },
        () => {
          console.log('player is ready');

          //Plugins
          player.draggableSeekbar();
          player.mobileUi();
          player.seekButtons({
            forward: 10,
            back: 10
          });
          if (progressBarPreviewUrl) {
            player.vttThumbnails({
              src: progressBarPreviewUrl,
              showTimestamp: true
            });
          }
          // event listeners
          onReady && onReady(player);
          onTimeUpdate && player.on('timeupdate', () => onTimeUpdate(player));
          onPlay && player.on('play', () => onPlay(player));
          onPause && player.on('pause', () => onPause(player));
          onEnded && player.on('ended', () => onEnded(player));
          onError && player.on('error', () => onError(player));
          onLoadedData && player.on('loadeddata', () => onLoadedData(player));
          onSeeked && player.on('seeked', () => onSeeked(player));
          onSeeking && player.on('seeking', () => onSeeking(player));
          onVolumeChange &&
            player.on('volumechange', () => onVolumeChange(player));
          onLoadedMetadata &&
            player.on('loadedmetadata', () => onLoadedMetadata(player));
          onPlaying && player.on('playing', () => onPlaying(player));
          onWaiting && player.on('waiting', () => onWaiting(player));
          onDispose && player.on('dispose', () => onDispose(player));
        }
      ));
    } else {
      if (seekTo && seekTo > 0) {
        playerRef.current.currentTime(seekTo);
        playerRef.current.play();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, videoRef, seekTo]);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered">
        {subtitles.length > 0 &&
          subtitles.map(sub => {
            if (englishLanguageCodes.has(sub.language.toLowerCase()))
              return (
                <track
                  key={sub._id}
                  kind="captions"
                  src={sub.src}
                  srcLang={sub.language}
                  label={sub.language}
                />
              );
          })}
      </video>
    </div>
  );
};

export default VideoJS;

// const EVENTS = [
//   'loadstart',
//   'progress',
//   'suspend',
//   'abort',
//   'error',
//   'emptied',
//   'stalled',
//   'loadedmetadata',
//   'loadeddata',
//   'canplay',
//   'canplaythrough',
//   'playing',
//   'waiting',
//   'seeking',
//   'seeked',
//   'ended',
//   'durationchange',
//   'timeupdate',
//   'play',
//   'pause',
//   'ratechange',
//   'resize',
//   'volumechange'
// ];
