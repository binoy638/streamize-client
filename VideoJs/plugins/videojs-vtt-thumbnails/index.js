/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable security/detect-object-injection */
import videojs from 'video.js';

// import request from 'request';

// Default options for the plugin.
const defaults = {};

// Cache for image elements
const cache = {};

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
const onPlayerReady = (player, options) => {
  player.addClass('vjs-vtt-thumbnails');
  // eslint-disable-next-line new-cap, no-use-before-define
  player.vttThumbnails = new vttThumbnailsPlugin(player, options);
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function vttThumbnails
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const vttThumbnails = function (options) {
  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
  });
};

/**
 * VTT Thumbnails class.
 *
 * This class performs all functions related to displaying the vtt
 * thumbnails.
 */
class vttThumbnailsPlugin {
  /**
   * Plugin class constructor, called by videojs on
   * ready event.
   *
   * @function  constructor
   * @param    {Player} player
   *           A Video.js player object.
   *
   * @param    {Object} [options={}]
   *           A plain object containing options for the plugin.
   */
  constructor(player, options) {
    this.player = player;
    this.options = options;
    this.initializeThumbnails();
    this.registeredEvents = {};
    return this;
  }

  src(source) {
    this.resetPlugin();
    this.options.src = source;
    this.initializeThumbnails();
  }

  detach() {
    this.resetPlugin();
  }

  resetPlugin() {
    if (this.thumbnailHolder) {
      this.thumbnailHolder.remove();
    }

    if (this.progressBar) {
      this.progressBar.removeEventListener(
        'pointerenter',
        this.registeredEvents.progressBarMouseEnter
      );
      this.progressBar.removeEventListener(
        'pointerleave',
        this.registeredEvents.progressBarMouseLeave
      );
      this.progressBar.removeEventListener(
        'pointermove',
        this.registeredEvents.progressBarMouseMove
      );
    }

    delete this.registeredEvents.progressBarMouseEnter;
    delete this.registeredEvents.progressBarMouseLeave;
    delete this.registeredEvents.progressBarMouseMove;
    delete this.progressBar;
    delete this.vttData;
    delete this.thumbnailHolder;
    delete this.lastStyle;
  }

  /**
   * Bootstrap the plugin.
   */
  initializeThumbnails() {
    if (!this.options.src) {
      return;
    }

    const baseUrl = this.getBaseUrl();
    const url = this.getFullyQualifiedUrl(this.options.src, baseUrl);

    this.getVttFile(url).then(data => {
      this.vttData = this.processVtt(data);
      this.setupThumbnailElement();
    });
  }

  /**
   * Builds a base URL should we require one.
   *
   * @return {string}
   */
  getBaseUrl() {
    return [
      // eslint-disable-next-line no-undef
      window.location.protocol,
      '//',
      // eslint-disable-next-line no-undef
      window.location.hostname,
      // eslint-disable-next-line no-undef
      window.location.port ? ':' + window.location.port : '',
      // eslint-disable-next-line no-undef
      window.location.pathname
    ]
      .join('')
      .split(/([^/]*)$/gi)
      .shift();
  }

  /**
   * Grabs the contents of the VTT file.
   *
   * @param url
   * @return {Promise}
   */
  getVttFile(url) {
    return new Promise(resolve => {
      // eslint-disable-next-line no-undef
      const req = new XMLHttpRequest();

      req.data = {
        resolve
      };

      req.addEventListener('load', this.vttFileLoaded);
      req.open('GET', url);
      req.overrideMimeType('text/plain; charset=utf-8');
      req.send();
    });
  }

  /**
   * Callback for loaded VTT file.
   */
  vttFileLoaded() {
    this.data.resolve(this.responseText);
  }

  setupThumbnailElement() {
    let mouseDisplay = null;

    if (!this.options.showTimestamp) {
      mouseDisplay = this.player.$('.vjs-mouse-display');
    }

    // eslint-disable-next-line no-undef
    const thumbHolder = document.createElement('div');

    thumbHolder.setAttribute('class', 'vjs-vtt-thumbnail-display');
    this.progressBar = this.player.$('.vjs-progress-control');
    this.progressBar.append(thumbHolder);
    this.thumbnailHolder = thumbHolder;

    if (mouseDisplay && !this.options.showTimestamp) {
      mouseDisplay.classList.add('vjs-hidden');
    }

    this.registeredEvents.progressBarMouseEnter = () => {
      return this.onBarMouseenter();
    };

    this.registeredEvents.progressBarMouseLeave = () => {
      return this.onBarMouseleave();
    };

    this.progressBar.addEventListener(
      'pointerenter',
      this.registeredEvents.progressBarMouseEnter
    );
    this.progressBar.addEventListener(
      'pointerleave',
      this.registeredEvents.progressBarMouseLeave
    );
  }

  onBarMouseenter() {
    this.mouseMoveCallback = e => {
      this.onBarMousemove(e);
    };
    // let isPointerDown = false;
    this.registeredEvents.progressBarMouseMove = this.mouseMoveCallback;
    this.progressBar.addEventListener(
      'pointermove',
      this.registeredEvents.progressBarMouseMove
    );
    this.showThumbnailHolder();
  }

  onBarMouseleave() {
    if (this.registeredEvents.progressBarMouseMove) {
      this.progressBar.removeEventListener(
        'pointermove',
        this.registeredEvents.progressBarMouseMove
      );
    }

    this.hideThumbnailHolder();
  }

  getXCoord(bar, mouseX) {
    const rect = bar.getBoundingClientRect();
    // eslint-disable-next-line no-undef
    const docEl = document.documentElement;

    // eslint-disable-next-line no-undef
    return mouseX - (rect.left + (window.pageXOffset || docEl.scrollLeft || 0));
  }

  onBarMousemove(event) {
    this.updateThumbnailStyle(
      videojs.dom.getPointerPosition(this.progressBar, event).x,
      this.progressBar.offsetWidth
    );
  }

  getStyleForTime(time) {
    for (let i = 0; i < this.vttData.length; ++i) {
      const item = this.vttData[i];

      if (time >= item.start && time < item.end) {
        // Cache miss
        if (item.css.url && !cache[item.css.url]) {
          // eslint-disable-next-line no-undef
          const image = new Image();

          image.src = item.css.url;
          cache[item.css.url] = image;
        }

        return item.css;
      }
    }
  }

  showThumbnailHolder() {
    this.thumbnailHolder.style.visibility = 'visible';
  }

  hideThumbnailHolder() {
    this.thumbnailHolder.style.visibility = 'hidden';
  }

  updateThumbnailStyle(percent, width) {
    const duration = this.player.duration();
    const time = percent * duration;
    const currentStyle = this.getStyleForTime(time);

    if (!currentStyle) {
      return this.hideThumbnailHolder();
    }

    const xPos = percent * width;
    const thumbnailWidth = Number.parseInt(currentStyle.width, 10);
    const halfthumbnailWidth = thumbnailWidth >> 1;
    const marginRight = width - (xPos + halfthumbnailWidth);
    const marginLeft = xPos - halfthumbnailWidth;

    if (width < thumbnailWidth) {
      this.thumbnailHolder.style.transform =
        'translateX(' + ((thumbnailWidth - width) / 2) * -1 + 'px)';
    } else if (marginLeft > 0 && marginRight > 0) {
      this.thumbnailHolder.style.transform =
        'translateX(' + (xPos - halfthumbnailWidth) + 'px)';
    } else if (marginLeft <= 0) {
      this.thumbnailHolder.style.transform = 'translateX(' + 0 + 'px)';
    } else if (marginRight <= 0) {
      this.thumbnailHolder.style.transform =
        'translateX(' + (width - thumbnailWidth) + 'px)';
    }

    if (this.lastStyle && this.lastStyle === currentStyle) {
      return;
    }

    this.lastStyle = currentStyle;

    for (const style in currentStyle) {
      // eslint-disable-next-line no-prototype-builtins
      if (currentStyle.hasOwnProperty(style)) {
        this.thumbnailHolder.style[style] = currentStyle[style];
      }
    }
  }

  processVtt(data) {
    const processedVtts = [];

    // fix newline bug
    data = data.replaceAll('\r\n', '\n');

    const vttDefinitions = data.split(/[\n\r]{2}/i);

    for (const vttDef of vttDefinitions) {
      if (
        /(\d{2}:)?(\d{2}:)?\d{2}(.\d{3})?( ?--> ?)(\d{2}:)?(\d{2}:)?\d{2}(.\d{3})?[\n\r].*/gi.test(
          vttDef
        )
      ) {
        const vttDefSplit = vttDef.split(/[\n\r]/i);
        const vttTiming = vttDefSplit[0];
        const vttTimingSplit = vttTiming.split(/ ?--> ?/i);
        const vttTimeStart = vttTimingSplit[0];
        const vttTimeEnd = vttTimingSplit[1];
        const vttImageDef = vttDefSplit[1];
        const vttCssDef = this.getVttCss(vttImageDef);

        processedVtts.push({
          start: this.getSecondsFromTimestamp(vttTimeStart),
          end: this.getSecondsFromTimestamp(vttTimeEnd),
          css: vttCssDef
        });
      }
    }

    return processedVtts;
  }

  getFullyQualifiedUrl(path, base) {
    if (path.includes('//')) {
      // We have a fully qualified path.
      return path;
    }

    if (base.indexOf('//') === 0) {
      // We don't have a fully qualified path, but need to
      // be careful with trimming.
      return [base.replace(/\/$/gi, ''), this.trim(path, '/')].join('/');
    }

    if (base.indexOf('//') > 0) {
      // We don't have a fully qualified path, and should
      // trim both sides of base and path.
      return [this.trim(base, '/'), this.trim(path, '/')].join('/');
    }

    // If all else fails.
    return path;
  }

  getPropsFromDef(def) {
    const imageDefSplit = def.split(/#xywh=/i);
    const imageUrl = imageDefSplit[0];
    const imageCoords = imageDefSplit[1];
    const splitCoords = imageCoords.match(/\d+/gi);

    return {
      x: splitCoords[0],
      y: splitCoords[1],
      w: splitCoords[2],
      h: splitCoords[3],
      image: imageUrl
    };
  }

  getVttCss(vttImageDef) {
    const cssObj = {};

    // If there isn't a protocol, use the VTT source URL.
    let baseSplit;

    baseSplit = this.options.src.includes('//')
      ? this.options.src.split(/([^/]*)$/gi).shift()
      : this.getBaseUrl() + this.options.src.split(/([^/]*)$/gi).shift();

    vttImageDef = this.getFullyQualifiedUrl(vttImageDef, baseSplit);

    if (!/#xywh=/i.test(vttImageDef)) {
      cssObj.background = 'url("' + vttImageDef + '")';
      return cssObj;
    }

    const imageProps = this.getPropsFromDef(vttImageDef);

    cssObj.background =
      'url("' +
      imageProps.image +
      '") no-repeat -' +
      imageProps.x +
      'px -' +
      imageProps.y +
      'px';
    cssObj.width = imageProps.w + 'px';
    cssObj.height = imageProps.h + 'px';
    cssObj.url = imageProps.image;

    return cssObj;
  }

  /**
   * deconstructTimestamp deconstructs a VTT timestamp
   *
   * @param  {string} timestamp VTT timestamp
   * @return {Object}           deconstructed timestamp
   */
  deconstructTimestamp(timestamp) {
    const splitStampMilliseconds = timestamp.split('.');
    const timeParts = splitStampMilliseconds[0];
    const timePartsSplit = timeParts.split(':');

    return {
      milliseconds: Number.parseInt(splitStampMilliseconds[1], 10) || 0,
      seconds: Number.parseInt(timePartsSplit.pop(), 10) || 0,
      minutes: Number.parseInt(timePartsSplit.pop(), 10) || 0,
      hours: Number.parseInt(timePartsSplit.pop(), 10) || 0
    };
  }

  /**
   * getSecondsFromTimestamp
   *
   * @param  {string} timestamp VTT timestamp
   * @return {number}           timestamp in seconds
   */
  getSecondsFromTimestamp(timestamp) {
    const timestampParts = this.deconstructTimestamp(timestamp);

    return Number.parseInt(
      timestampParts.hours * (60 * 60) +
        timestampParts.minutes * 60 +
        timestampParts.seconds +
        timestampParts.milliseconds / 1000,
      10
    );
  }

  /**
   * trim
   *
   * @param  {string} str      source string
   * @param  {string} charlist characters to trim from text
   * @return {string}          trimmed string
   */
  trim(str, charlist) {
    let whitespace = [
      ' ',
      '\n',
      '\r',
      '\t',
      '\f',
      '\u000B',
      '\u00A0',
      '\u2000',
      '\u2001',
      '\u2002',
      '\u2003',
      '\u2004',
      '\u2005',
      '\u2006',
      '\u2007',
      '\u2008',
      '\u2009',
      '\u200A',
      '\u200B',
      '\u2028',
      '\u2029',
      '\u3000'
    ].join('');
    let l = 0;
    let i = 0;

    str += '';
    if (charlist) {
      whitespace = (charlist + '').replace(/([$()*+./:?[\]^{}])/g, '$1');
    }
    l = str.length;
    for (i = 0; i < l; i++) {
      if (!whitespace.includes(str.charAt(i))) {
        str = str.slice(Math.max(0, i));
        break;
      }
    }
    l = str.length;
    for (i = l - 1; i >= 0; i--) {
      if (!whitespace.includes(str.charAt(i))) {
        str = str.slice(0, Math.max(0, i + 1));
        break;
      }
    }
    return !whitespace.includes(str.charAt(0)) ? str : '';
  }
}

// Register the plugin with video.js.
registerPlugin('vttThumbnails', vttThumbnails);

export default vttThumbnails;
