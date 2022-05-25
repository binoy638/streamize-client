import 'video.js/dist/video-js.css';

import React from 'react';
import videojs from 'video.js';

// import 'videojs-vtt-thumbnails';
import { ISubtitle } from '../@types';
import { getSubtitleLink } from '../API';

// videojs.registerPlugin('vttThumbnails', vttThumbnails);

export const VideoJS = ({
  options,
  onReady,
  videoSlug,
  subtitles = []
}: {
  options: videojs.PlayerOptions;
  onReady: any;
  videoSlug: string;
  subtitles: ISubtitle[];
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

      // player.vttThumbnails({
      //   src: 'http://localhost:3000/thumbnails.vtt',
      //   showTimestamp: true
      // });
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
