import { gql } from '@apollo/client';

export const GET_TORRENT = gql`
  query Torrent($slug: String!) {
    torrent(slug: $slug) {
      ... on TorrentWithInfoDownload {
        _id
        slug
        magnet
        name
        size
        files {
          _id
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
      ... on TorrentWithInfo {
        _id
        slug
        magnet
        name
        size
        files {
          _id
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
        status
      }
      ... on TorrentWithoutInfo {
        _id
        slug
        magnet
        status
      }
    }
  }
`;

export const GET_TORRENTS = gql`
  query TorrentsList {
    torrents {
      ... on TorrentWithInfoDownload {
        _id
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
      ... on TorrentWithInfo {
        _id
        slug
        magnet
        name
        size
        status
      }
      ... on TorrentWithoutInfo {
        _id
        slug
        magnet
        status
      }
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
        ... on TorrentWithInfoDownload {
          _id
          slug
          magnet
          name
          size
          files {
            _id
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
        ... on TorrentWithInfo {
          _id
          slug
          magnet
          name
          size
          files {
            _id
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
          status
        }
        ... on TorrentWithoutInfo {
          _id
          slug
          magnet
          status
        }
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

export const GET_WATCH_PARTY = gql`
  query getWatchParty($slug: String!) {
    getWatchParty(slug: $slug) {
      _id
      slug
      name
      host {
        username
        _id
      }
      partyPlayerControl
      maxViewers
    }
  }
`;

export const GET_USER_WATCH_PARTIES = gql`
  query getUserWatchParties {
    getUserWatchParties {
      _id
      slug
      name
      host {
        username
        _id
      }
      partyPlayerControl
      maxViewers
    }
  }
`;
