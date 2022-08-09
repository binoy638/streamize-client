declare module 'video.js' {
  // this tells the type system that the VideoJsPlayer object has a method seekButtons
  export interface VideoJsPlayer {
    vttThumbnails(options: VideoJsVttThumbnailsOptions): void;
  }
  // this tells the type system that the VideoJsPlayer initializer can have options for plugin seekButtons
  export interface VideoJsPlayerPluginOptions {
    vttThumbnails?: VideoJsVttThumbnailsOptions;
  }
}

export interface VideoJsVttThumbnailsOptions {
  src: string;
  showTimestamp?: boolean;
}
