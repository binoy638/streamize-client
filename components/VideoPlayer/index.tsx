import React from "react";
import VideoJS from "../VideoJs";

const Player = ({ src }: { src: string }) => {
  const playerRef = React.useRef<any>(null);

  const videoJsOptions = {
    // lookup the options in the docs for more options
    // autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: src,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player: videojs.VideoJsPlayer) => {
    playerRef.current = player;

    // you can handle player events here
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  return <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />;
};

export default Player;
