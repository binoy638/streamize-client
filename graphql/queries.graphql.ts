import { gql } from '@apollo/client';

export const GET_TORRENT = gql`
  query Torrent($slug: String!) {
    torrent(slug: $slug) {
      _id
      slug
      name
      size
      files {
        name
        size
        slug
        downloadInfo {
          downloaded
          progress
        }
        status
        transcodingPercent
      }
      downloadInfo {
        downloadSpeed
        uploadSpeed
        progress
        timeRemaining
      }
      status
    }
  }
`;

export const GET_TORRENTS = gql`
  query TorrentsList {
    torrents {
      slug
      magnet
      name
      size
      status
      downloadInfo {
        downloadSpeed
        uploadSpeed
        progress
        timeRemaining
      }
    }
    diskUsage {
      free
      size
    }
  }
`;

export const GET_VIDEO = gql`
  query Video($input: VideoInput!, $videoSlug: String!) {
    video(input: $input) {
      slug
      name
      size
      progressPreview
      subtitles {
        _id
        fileName
        language
      }
      status
    }
    videoProgress(videoSlug: $videoSlug)
  }
`;

export const GET_DISK_USAGE = gql`
  query DiskUsage {
    diskUsage {
      free
      size
    }
  }
`;

export const GET_SHARED_PLAYLIST = gql`
  query SharedPlaylist($slug: String!) {
    sharedPlaylist(slug: $slug) {
      slug
      user {
        username
      }
      torrent {
        _id
        slug
        name
        size
        files {
          name
          size
          slug
          downloadInfo {
            downloaded
            progress
          }
          status
          transcodingPercent
        }
        downloadInfo {
          downloadSpeed
          uploadSpeed
          progress
          timeRemaining
        }
        status
      }
      expiresIn
    }
  }
`;

export const GET_SHARED_PLAYLIST_VIDEO = gql`
  query SharedPlaylistVideo($input: SharedPlaylistVideoInput!, $slug: String!) {
    sharedPlaylistVideo(input: $input) {
      slug
      name
      size
      progressPreview
      subtitles {
        _id
        fileName
        language
      }
      status
    }
    sharedPlaylist(slug: $slug) {
      user {
        username
      }
      expiresIn
    }
  }
`;
