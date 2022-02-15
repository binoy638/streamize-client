import type { NextPage } from "next";
import React from "react";

import VideoJS from "../components/VideoJs";

const Player: NextPage = () => {
  const playerRef = React.useRef<any>(null);

  const videoJsOptions = {
    // lookup the options in the docs for more options
    // autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://api.streamize.backendev.com/video/play/wnruo/xyjux",
        // src: "http://localhost:8000/video/play/",
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

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="w-7/12">
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </div>
  );
};

export default Player;
