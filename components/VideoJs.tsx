import 'video.js/dist/video-js.css';
import 'videojs-vtt-thumbnails';
import 'videojs-seek-buttons';
import 'videojs-seek-buttons/dist/videojs-seek-buttons.css';
import 'videojs-mobile-ui/dist/videojs-mobile-ui.css';
import 'videojs-mobile-ui';

import React from 'react';
import { isDesktop } from 'react-device-detect';
import videojs from 'video.js';

// import 'videojs-vtt-thumbnails';
import { ISubtitle } from '../@types';
import { getSubtitleLink } from '../API';
// videojs.registerPlugin('vttThumbnails', vttThumbnails);

// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-namespace
//   namespace videojs {
//     interface VideoJsPlayer {
//       vttThumbnails({ src }: { src: string }): unknown;
//     }
//   }
// }

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

  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log('player is ready');
        onReady && onReady(player);
      }));
      const savedVolume = localStorage.getItem('volume');
      // eslint-disable-next-line sonarjs/no-collapsible-if
      if (savedVolume && isDesktop) {
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
      player.mobileUi();
      player.seekButtons({
        forward: 10,
        back: 10
      });
      player.on('volumechange', () => {
        localStorage.setItem('volume', player.volume().toString());
      });
      //  let player = videojs('ID_OF_YOUR_VIDEO');
      //  const SeekBar = videojs.getComponent('SeekBar');

      //  SeekBar.prototype.getPercent = function getPercent() {
      //    const time = this.player_.currentTime();
      //    const percent = time / this.player_.duration();
      //    return percent >= 1 ? 1 : percent;
      //  };

      //  SeekBar.prototype.handleMouseMove = function handleMouseMove(event) {
      //    let newTime = this.calculateDistance(event) * this.player_.duration();
      //    if (newTime === this.player_.duration()) {
      //      newTime = newTime - 0.1;
      //    }
      //    this.player_.currentTime(newTime);
      //    this.update();
      //    let currentTime = player.currentTime();
      //    let minutes = Math.floor(currentTime / 60);
      //    let seconds = Math.floor(currentTime - minutes * 60);
      //    let x = minutes < 10 ? '0' + minutes : minutes;
      //    let y = seconds < 10 ? '0' + seconds : seconds;
      //    let format = x + ':' + y;
      //    player.controlBar.currentTimeDisplay.el_.innerHTML = format;
      //  };
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
        {subtitles.length > 0 &&
          subtitles.map(sub => {
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
