import "video.js/dist/video-js.css";

import React from "react";
import videojs from "video.js";

export const VideoJS = ({
  options,
  onReady,
}: {
  options: videojs.PlayerOptions;
  onReady: any;
}) => {
  const videoRef = React.useRef<any>();
  const playerRef = React.useRef<any>();

  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
        onReady && onReady(player);
      }));
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
        {/* <track
          kind="captions"
          src="https://hs-activestorage.s3.eu-west-1.amazonaws.com/yvu0znh5lo0qy2i6r27ctvct9t78?response-content-disposition=attachment%3B%20filename%3D%22Venom.Let.There.Be.Carnage.2021.2160p.10bit.HDR.DV.BluRay.8CH.x265.HEVC-PSA.vtt%22%3B%20filename%2A%3DUTF-8%27%27Venom.Let.There.Be.Carnage.2021.2160p.10bit.HDR.DV.BluRay.8CH.x265.HEVC-PSA.vtt&response-content-type=text%2Fvtt&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIUVYIPOTEGJRYD6Q%2F20220203%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20220203T062917Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=6eab42c6ba72d3f81872171d2aea2b7723fca6378ea33e6e17e372f66f1a367a"
          srcLang="en"
          label="English"
        /> */}
      </video>
    </div>
  );
};

export default VideoJS;
