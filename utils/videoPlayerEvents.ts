/* eslint-disable unicorn/no-static-only-class */
export class VideoPlayerEvents {
  static onVolumeChange = (player: videojs.VideoJsPlayer) => {
    localStorage.setItem('volume', player.volume().toString());
  };
}
