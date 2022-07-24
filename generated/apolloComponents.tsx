import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type DiskUsage = {
  __typename?: 'DiskUsage';
  free: Scalars['Float'];
  size: Scalars['Float'];
};

export type DownloadInfo = {
  __typename?: 'DownloadInfo';
  completed: Scalars['Boolean'];
  downloadSpeed: Scalars['Float'];
  paused: Scalars['Boolean'];
  progress: Scalars['Float'];
  timeRemaining: Scalars['Float'];
  uploadSpeed: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  diskUsage: DiskUsage;
  sharedPlaylist: SharedPlaylist;
  sharedPlaylistVideo: Video;
  torrent: Torrent;
  torrents: Array<Torrent>;
  video: Video;
  videoProgress: Scalars['Float'];
};

export type QuerySharedPlaylistArgs = {
  slug: Scalars['String'];
};

export type QuerySharedPlaylistVideoArgs = {
  input: SharedPlaylistVideoInput;
};

export type QueryTorrentArgs = {
  slug: Scalars['String'];
};

export type QueryVideoArgs = {
  input: VideoInput;
};

export type QueryVideoProgressArgs = {
  videoSlug: Scalars['String'];
};

export type SharedPlaylist = {
  __typename?: 'SharedPlaylist';
  _id: Scalars['ID'];
  expiresIn: Scalars['DateTime'];
  isTorrent: Scalars['Boolean'];
  mediaId: Scalars['String'];
  slug: Scalars['String'];
  torrent: Torrent;
  user: User;
};

export type SharedPlaylistVideoInput = {
  slug: Scalars['String'];
  videoSlug: Scalars['String'];
};

export type Subtitles = {
  __typename?: 'Subtitles';
  _id: Scalars['ID'];
  fileName: Scalars['String'];
  language: Scalars['String'];
  path: Scalars['String'];
  title: Scalars['String'];
};

export type Torrent =
  | TorrentWithInfo
  | TorrentWithInfoDownload
  | TorrentWithoutInfo;

export enum TorrentState {
  Added = 'ADDED',
  Done = 'DONE',
  Downloading = 'DOWNLOADING',
  Error = 'ERROR',
  Paused = 'PAUSED',
  Processing = 'PROCESSING',
  Queued = 'QUEUED'
}

export type TorrentWithInfo = {
  __typename?: 'TorrentWithInfo';
  _id: Scalars['ID'];
  files: Array<Video>;
  infoHash: Scalars['String'];
  magnet: Scalars['String'];
  name: Scalars['String'];
  size: Scalars['Float'];
  slug: Scalars['String'];
  status: TorrentState;
};

export type TorrentWithInfoDownload = {
  __typename?: 'TorrentWithInfoDownload';
  _id: Scalars['ID'];
  downloadInfo: DownloadInfo;
  files: Array<Video>;
  infoHash: Scalars['String'];
  magnet: Scalars['String'];
  name: Scalars['String'];
  size: Scalars['Float'];
  slug: Scalars['String'];
  status: TorrentState;
};

export type TorrentWithoutInfo = {
  __typename?: 'TorrentWithoutInfo';
  _id: Scalars['ID'];
  magnet: Scalars['String'];
  slug: Scalars['String'];
  status: TorrentState;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  allocatedMemory: Scalars['Float'];
  isAdmin: Scalars['Boolean'];
  torrents: Scalars['String'];
  username: Scalars['ID'];
};

export type Video = {
  __typename?: 'Video';
  _id: Scalars['ID'];
  downloadInfo?: Maybe<VideoDownloadInfo>;
  ext: Scalars['String'];
  name: Scalars['String'];
  path: Scalars['String'];
  progressPreview: Scalars['Boolean'];
  size: Scalars['Float'];
  slug: Scalars['String'];
  status: VideoState;
  subtitles: Array<Subtitles>;
  transcodingPercent: Scalars['Float'];
};

export type VideoDownloadInfo = {
  __typename?: 'VideoDownloadInfo';
  downloaded: Scalars['Float'];
  progress: Scalars['Float'];
};

export type VideoInput = {
  torrentSlug: Scalars['String'];
  videoSlug: Scalars['String'];
};

export enum VideoState {
  Done = 'DONE',
  Downloading = 'DOWNLOADING',
  Error = 'ERROR',
  Processing = 'PROCESSING',
  Queued = 'QUEUED'
}

export type TorrentQueryVariables = Exact<{
  slug: Scalars['String'];
}>;

export type TorrentQuery = {
  __typename?: 'Query';
  torrent:
    | {
        __typename?: 'TorrentWithInfo';
        _id: string;
        slug: string;
        magnet: string;
        name: string;
        size: number;
        status: TorrentState;
        files: Array<{
          __typename?: 'Video';
          _id: string;
          name: string;
          size: number;
          slug: string;
          status: VideoState;
          transcodingPercent: number;
          downloadInfo?: {
            __typename?: 'VideoDownloadInfo';
            downloaded: number;
            progress: number;
          } | null;
        }>;
      }
    | {
        __typename?: 'TorrentWithInfoDownload';
        _id: string;
        slug: string;
        magnet: string;
        name: string;
        size: number;
        status: TorrentState;
        files: Array<{
          __typename?: 'Video';
          _id: string;
          name: string;
          size: number;
          slug: string;
          status: VideoState;
          transcodingPercent: number;
          downloadInfo?: {
            __typename?: 'VideoDownloadInfo';
            downloaded: number;
            progress: number;
          } | null;
        }>;
        downloadInfo: {
          __typename?: 'DownloadInfo';
          downloadSpeed: number;
          uploadSpeed: number;
          progress: number;
          timeRemaining: number;
        };
      }
    | {
        __typename?: 'TorrentWithoutInfo';
        _id: string;
        slug: string;
        magnet: string;
        status: TorrentState;
      };
};

export type TorrentsListQueryVariables = Exact<{ [key: string]: never }>;

export type TorrentsListQuery = {
  __typename?: 'Query';
  torrents: Array<
    | {
        __typename?: 'TorrentWithInfo';
        _id: string;
        slug: string;
        magnet: string;
        name: string;
        size: number;
        status: TorrentState;
      }
    | {
        __typename?: 'TorrentWithInfoDownload';
        _id: string;
        slug: string;
        magnet: string;
        name: string;
        size: number;
        status: TorrentState;
        downloadInfo: {
          __typename?: 'DownloadInfo';
          downloadSpeed: number;
          uploadSpeed: number;
          progress: number;
          timeRemaining: number;
        };
      }
    | {
        __typename?: 'TorrentWithoutInfo';
        _id: string;
        slug: string;
        magnet: string;
        status: TorrentState;
      }
  >;
  diskUsage: { __typename?: 'DiskUsage'; free: number; size: number };
};

export type VideoQueryVariables = Exact<{
  input: VideoInput;
  videoSlug: Scalars['String'];
}>;

export type VideoQuery = {
  __typename?: 'Query';
  videoProgress: number;
  video: {
    __typename?: 'Video';
    slug: string;
    name: string;
    size: number;
    progressPreview: boolean;
    status: VideoState;
    subtitles: Array<{
      __typename?: 'Subtitles';
      _id: string;
      fileName: string;
      language: string;
    }>;
  };
};

export type DiskUsageQueryVariables = Exact<{ [key: string]: never }>;

export type DiskUsageQuery = {
  __typename?: 'Query';
  diskUsage: { __typename?: 'DiskUsage'; free: number; size: number };
};

export type SharedPlaylistQueryVariables = Exact<{
  slug: Scalars['String'];
}>;

export type SharedPlaylistQuery = {
  __typename?: 'Query';
  sharedPlaylist: {
    __typename?: 'SharedPlaylist';
    slug: string;
    expiresIn: any;
    user: { __typename?: 'User'; username: string };
    torrent:
      | {
          __typename?: 'TorrentWithInfo';
          _id: string;
          slug: string;
          magnet: string;
          name: string;
          size: number;
          status: TorrentState;
          files: Array<{
            __typename?: 'Video';
            _id: string;
            name: string;
            size: number;
            slug: string;
            status: VideoState;
            transcodingPercent: number;
            downloadInfo?: {
              __typename?: 'VideoDownloadInfo';
              downloaded: number;
              progress: number;
            } | null;
          }>;
        }
      | {
          __typename?: 'TorrentWithInfoDownload';
          _id: string;
          slug: string;
          magnet: string;
          name: string;
          size: number;
          status: TorrentState;
          files: Array<{
            __typename?: 'Video';
            _id: string;
            name: string;
            size: number;
            slug: string;
            status: VideoState;
            transcodingPercent: number;
            downloadInfo?: {
              __typename?: 'VideoDownloadInfo';
              downloaded: number;
              progress: number;
            } | null;
          }>;
          downloadInfo: {
            __typename?: 'DownloadInfo';
            downloadSpeed: number;
            uploadSpeed: number;
            progress: number;
            timeRemaining: number;
          };
        }
      | {
          __typename?: 'TorrentWithoutInfo';
          _id: string;
          slug: string;
          magnet: string;
          status: TorrentState;
        };
  };
};

export type SharedPlaylistVideoQueryVariables = Exact<{
  input: SharedPlaylistVideoInput;
  slug: Scalars['String'];
}>;

export type SharedPlaylistVideoQuery = {
  __typename?: 'Query';
  sharedPlaylistVideo: {
    __typename?: 'Video';
    slug: string;
    name: string;
    size: number;
    progressPreview: boolean;
    status: VideoState;
    subtitles: Array<{
      __typename?: 'Subtitles';
      _id: string;
      fileName: string;
      language: string;
    }>;
  };
  sharedPlaylist: {
    __typename?: 'SharedPlaylist';
    expiresIn: any;
    user: { __typename?: 'User'; username: string };
  };
};

export const TorrentDocument = gql`
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

/**
 * __useTorrentQuery__
 *
 * To run a query within a React component, call `useTorrentQuery` and pass it any options that fit your needs.
 * When your component renders, `useTorrentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTorrentQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useTorrentQuery(
  baseOptions: Apollo.QueryHookOptions<TorrentQuery, TorrentQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TorrentQuery, TorrentQueryVariables>(
    TorrentDocument,
    options
  );
}
export function useTorrentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TorrentQuery, TorrentQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TorrentQuery, TorrentQueryVariables>(
    TorrentDocument,
    options
  );
}
export type TorrentQueryHookResult = ReturnType<typeof useTorrentQuery>;
export type TorrentLazyQueryHookResult = ReturnType<typeof useTorrentLazyQuery>;
export type TorrentQueryResult = Apollo.QueryResult<
  TorrentQuery,
  TorrentQueryVariables
>;
export const TorrentsListDocument = gql`
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
    diskUsage {
      free
      size
    }
  }
`;

/**
 * __useTorrentsListQuery__
 *
 * To run a query within a React component, call `useTorrentsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTorrentsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTorrentsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useTorrentsListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TorrentsListQuery,
    TorrentsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TorrentsListQuery, TorrentsListQueryVariables>(
    TorrentsListDocument,
    options
  );
}
export function useTorrentsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TorrentsListQuery,
    TorrentsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TorrentsListQuery, TorrentsListQueryVariables>(
    TorrentsListDocument,
    options
  );
}
export type TorrentsListQueryHookResult = ReturnType<
  typeof useTorrentsListQuery
>;
export type TorrentsListLazyQueryHookResult = ReturnType<
  typeof useTorrentsListLazyQuery
>;
export type TorrentsListQueryResult = Apollo.QueryResult<
  TorrentsListQuery,
  TorrentsListQueryVariables
>;
export const VideoDocument = gql`
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

/**
 * __useVideoQuery__
 *
 * To run a query within a React component, call `useVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoQuery({
 *   variables: {
 *      input: // value for 'input'
 *      videoSlug: // value for 'videoSlug'
 *   },
 * });
 */
export function useVideoQuery(
  baseOptions: Apollo.QueryHookOptions<VideoQuery, VideoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<VideoQuery, VideoQueryVariables>(
    VideoDocument,
    options
  );
}
export function useVideoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<VideoQuery, VideoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<VideoQuery, VideoQueryVariables>(
    VideoDocument,
    options
  );
}
export type VideoQueryHookResult = ReturnType<typeof useVideoQuery>;
export type VideoLazyQueryHookResult = ReturnType<typeof useVideoLazyQuery>;
export type VideoQueryResult = Apollo.QueryResult<
  VideoQuery,
  VideoQueryVariables
>;
export const DiskUsageDocument = gql`
  query DiskUsage {
    diskUsage {
      free
      size
    }
  }
`;

/**
 * __useDiskUsageQuery__
 *
 * To run a query within a React component, call `useDiskUsageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDiskUsageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDiskUsageQuery({
 *   variables: {
 *   },
 * });
 */
export function useDiskUsageQuery(
  baseOptions?: Apollo.QueryHookOptions<DiskUsageQuery, DiskUsageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DiskUsageQuery, DiskUsageQueryVariables>(
    DiskUsageDocument,
    options
  );
}
export function useDiskUsageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DiskUsageQuery,
    DiskUsageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DiskUsageQuery, DiskUsageQueryVariables>(
    DiskUsageDocument,
    options
  );
}
export type DiskUsageQueryHookResult = ReturnType<typeof useDiskUsageQuery>;
export type DiskUsageLazyQueryHookResult = ReturnType<
  typeof useDiskUsageLazyQuery
>;
export type DiskUsageQueryResult = Apollo.QueryResult<
  DiskUsageQuery,
  DiskUsageQueryVariables
>;
export const SharedPlaylistDocument = gql`
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

/**
 * __useSharedPlaylistQuery__
 *
 * To run a query within a React component, call `useSharedPlaylistQuery` and pass it any options that fit your needs.
 * When your component renders, `useSharedPlaylistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSharedPlaylistQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useSharedPlaylistQuery(
  baseOptions: Apollo.QueryHookOptions<
    SharedPlaylistQuery,
    SharedPlaylistQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SharedPlaylistQuery, SharedPlaylistQueryVariables>(
    SharedPlaylistDocument,
    options
  );
}
export function useSharedPlaylistLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SharedPlaylistQuery,
    SharedPlaylistQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SharedPlaylistQuery, SharedPlaylistQueryVariables>(
    SharedPlaylistDocument,
    options
  );
}
export type SharedPlaylistQueryHookResult = ReturnType<
  typeof useSharedPlaylistQuery
>;
export type SharedPlaylistLazyQueryHookResult = ReturnType<
  typeof useSharedPlaylistLazyQuery
>;
export type SharedPlaylistQueryResult = Apollo.QueryResult<
  SharedPlaylistQuery,
  SharedPlaylistQueryVariables
>;
export const SharedPlaylistVideoDocument = gql`
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

/**
 * __useSharedPlaylistVideoQuery__
 *
 * To run a query within a React component, call `useSharedPlaylistVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useSharedPlaylistVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSharedPlaylistVideoQuery({
 *   variables: {
 *      input: // value for 'input'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useSharedPlaylistVideoQuery(
  baseOptions: Apollo.QueryHookOptions<
    SharedPlaylistVideoQuery,
    SharedPlaylistVideoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SharedPlaylistVideoQuery,
    SharedPlaylistVideoQueryVariables
  >(SharedPlaylistVideoDocument, options);
}
export function useSharedPlaylistVideoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SharedPlaylistVideoQuery,
    SharedPlaylistVideoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SharedPlaylistVideoQuery,
    SharedPlaylistVideoQueryVariables
  >(SharedPlaylistVideoDocument, options);
}
export type SharedPlaylistVideoQueryHookResult = ReturnType<
  typeof useSharedPlaylistVideoQuery
>;
export type SharedPlaylistVideoLazyQueryHookResult = ReturnType<
  typeof useSharedPlaylistVideoLazyQuery
>;
export type SharedPlaylistVideoQueryResult = Apollo.QueryResult<
  SharedPlaylistVideoQuery,
  SharedPlaylistVideoQueryVariables
>;
