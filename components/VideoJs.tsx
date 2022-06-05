/* eslint-disable sonarjs/cognitive-complexity */
import 'video.js/dist/video-js.css';
import 'videojs-seek-buttons';
import 'videojs-seek-buttons/dist/videojs-seek-buttons.css';
import 'videojs-mobile-ui/dist/videojs-mobile-ui.css';
import 'videojs-mobile-ui';
import './plugins/videojs-draggable-seekbar/videojs-draggable-seekbar';
import './plugins/videojs-vtt-thumbnails';

import React from 'react';
import videojs from 'video.js';

import { ISubtitle } from '../@types';
import { getSubtitleLink } from '../API';

const englishLanguageCodes = new Set([
  'en',
  'en-US',
  'en-GB',
  'eng',
  'english'
]);

export const VideoJS = ({
  options,
  onReady,
  videoSlug,
  subtitles = [],
  preview
}: {
  options: videojs.PlayerOptions;
  onReady: any;
  videoSlug: string;
  subtitles: ISubtitle[];
  preview?: string;
}) => {
  const videoRef = React.useRef<any>();
  const playerRef = React.useRef<any>();
  const [subs, setSubs] = React.useState<ISubtitle[]>(subtitles);

  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      if (subs.length > 0) {
        const engSub = subs.filter(sub =>
          englishLanguageCodes.has(sub.language)
        );
        if (engSub) {
          setSubs(engSub);
        }
      }

      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log('player is ready');
        onReady && onReady(player);
      }));
      const savedVolume = localStorage.getItem('volume');
      // eslint-disable-next-line sonarjs/no-collapsible-if
      if (savedVolume) {
        // eslint-disable-next-line unicorn/no-lonely-if
        if (savedVolume === '0' || Number(savedVolume)) {
          player.volume(Number(savedVolume));
        }
      }

      if (preview) {
        player.vttThumbnails({
          src: preview,
          showTimestamp: true
        });
      }
      player.draggableSeekbar();
      player.mobileUi();
      player.seekButtons({
        forward: 10,
        back: 10
      });
      player.on('volumechange', () => {
        localStorage.setItem('volume', player.volume().toString());
      });
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
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
        {subs.splice(5).length > 0 &&
          subs.map(sub => {
            return (
              <track
                key={sub._id || sub.fileName}
                kind="captions"
                src={getSubtitleLink(videoSlug, sub.fileName)}
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
