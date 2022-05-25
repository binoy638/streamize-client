import React from 'react';

import { ISubtitle } from '../../@types';
import VideoJS from '../VideoJs';

const Player = ({
  src,
  subtitle,
  videoSlug
}: {
  src: string;
  subtitle: ISubtitle[];
  videoSlug: string;
}) => {
  const playerRef = React.useRef<any>(null);

  const videoJsOptions = {
    // lookup the options in the docs for more options
    // autoplay: true,
    // plugins: {
    //   spriteThumbnails: {
    //     width: 160,
    //     height: 90
    //   }
    // },
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src
        // type: 'video/mp4'
        // spriteThumbnails: {
        //   url: 'http://localhost:3000/thumbnails.jpg'
        // }
      }
    ]
  };

  const handlePlayerReady = (player: videojs.VideoJsPlayer) => {
    playerRef.current = player;

    // you can handle player events here
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };

  return (
    <VideoJS
      videoSlug={videoSlug}
      options={videoJsOptions}
      onReady={handlePlayerReady}
      subtitles={subtitle}
    />
  );
};

export default Player;
