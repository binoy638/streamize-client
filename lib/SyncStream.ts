import { io, Socket } from 'socket.io-client';
import { VideoJsPlayer } from 'video.js';

import { SyncStreamsEvents } from '../@types';

class SyncStream {
  private player: VideoJsPlayer;
  private socket: Socket;
  private Io: typeof io;
  private isHost: boolean;
  private streamId: string;

  constructor(
    Io: typeof io,
    socket: Socket,
    player: VideoJsPlayer,
    isHost: boolean,
    shareSlug: string
  ) {
    this.Io = Io;
    this.socket = socket;
    this.player = player;
    this.isHost = isHost;
    this.streamId = `stream-${shareSlug}`;
    console.log({ isHost: this.isHost });
    if (this.isHost) {
      this.streamCreated();
      this.player.on('play', () => {
        this.playerPlay();
      });
      this.player.on('pause', () => {
        this.playerPause();
      });
      this.player.on('seeked', () => {
        this.playerSeeked(player.currentTime());
      });
    } else {
      this.streamMemberJoined();
    }

    this.socket.on(SyncStreamsEvents.PLAY, data => {
      console.log('play received', data);
      this.player.play();
    });

    this.socket.on(SyncStreamsEvents.PAUSE, () => {
      console.log('pause received');

      this.player.pause();
    });
    this.socket.on(
      SyncStreamsEvents.SEEKED,
      (data: { streamId: string; seekTime: number }) => {
        console.log('seeked', data);
        this.player.currentTime(data.seekTime);
      }
    );
  }

  private streamCreated() {
    console.log('stream created');
    this.socket.emit(SyncStreamsEvents.CREATED, {
      id: this.streamId,
      host: this.socket.id,
      members: [this.socket.id]
    });
  }

  private streamMemberJoined() {
    console.log('stream joined');
    this.socket.emit(SyncStreamsEvents.NEW_MEMBER_JOINED, {
      streamId: this.streamId,
      member: this.socket.id
    });
  }

  private playerPlay() {
    this.socket.emit(SyncStreamsEvents.PLAY, {
      streamId: this.streamId,
      id: this.socket.id
    });
  }

  private playerPause() {
    this.socket.emit(SyncStreamsEvents.PAUSE, { streamId: this.streamId });
  }

  private playerSeeked(seekTime: number) {
    this.socket.emit(SyncStreamsEvents.SEEKED, {
      streamId: this.streamId,
      seekTime
    });
  }
}

export default SyncStream;
