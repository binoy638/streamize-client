/* eslint-disable unicorn/no-static-only-class */
export class VideoPlayerEvents {
  static onReady = (player: videojs.VideoJsPlayer) => {
    const savedVolume = localStorage.getItem('volume');
    if (savedVolume && (savedVolume === '0' || Number(savedVolume))) {
      player.volume(Number(savedVolume));
    }
  };

  static onVolumeChange = (player: videojs.VideoJsPlayer) => {
    localStorage.setItem('volume', player.volume().toString());
  };
}
