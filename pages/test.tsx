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
        src: "https://mcloud.backendev.com/video/play/61fb6a2aa361f7031798650b/zigf8",
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

  // const changePlayerOptions = () => {
  //   // you can update the player through the Video.js player instance
  //   if (!playerRef.current) {
  //     return;
  //   }
  //   // [update player through instance's api]
  //   playerRef.current.src([{src: 'http://ex.com/video.mp4', type: 'video/mp4'}]);
  //   playerRef.current.autoplay(false);
  // };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="w-7/12">
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </div>
  );
  // return (
  //   <div>
  //     <div>
  //       <video width={650} controls autoPlay>
  //         <source
  //           // src="https://mcloud.backendev.com/video/7d962ec9137989d19e346d7e68946e88d41fe991"
  //           src="https://mcloud.backendev.com/video/play/61fb6a2aa361f7031798650b/zigf8"
  //           type="video/mp4"
  //         />
  //       </video>
  //     </div>
  //   </div>
  // );
};

export default Player;
