import type { VideoJsPlayer } from 'video.js';
import videojs from 'video.js';

const SeekBarComponent = videojs.getComponent('SeekBar');

const Plugin = videojs.getPlugin('plugin');

export class VideoJsExamplePlugin extends Plugin {
  constructor(player: VideoJsPlayer) {
    super(player);
    const SeekBar = SeekBarComponent.prototype as videojs.SeekBar;
    player.ready(() => {
      SeekBar.getPercent = function getPercent() {
        const time = this.player_.currentTime();
        const percent = time / this.player_.duration();
        return percent >= 1 ? 1 : percent;
      };
      SeekBar.handleMouseMove = function handleMouseMove(event) {
        let newTime = this.calculateDistance(event) * this.player_.duration();
        if (newTime === this.player_.duration()) {
          newTime -= 0.1;
        }
        this.player_.currentTime(newTime);
        this.update();
      };
    });
  }
}

videojs.registerPlugin('draggableSeekbar', VideoJsExamplePlugin);

declare module 'video.js' {
  export interface VideoJsPlayer {
    draggableSeekbar: () => VideoJsExamplePlugin;
  }
}
