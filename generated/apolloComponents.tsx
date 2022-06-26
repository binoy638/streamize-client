import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type DiskUsage = {
  __typename?: 'DiskUsage';
  free: Scalars['Float'];
  size: Scalars['Float'];
};

export type DownloadInfo = {
  __typename?: 'DownloadInfo';
  completed: Scalars['Int'];
  downloadSpeed: Scalars['Int'];
  paused: Scalars['Int'];
  progress: Scalars['Float'];
  timeRemaining: Scalars['Int'];
  uploadSpeed: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  diskUsage: DiskUsage;
  torrent: Torrent;
  torrents: Array<Torrent>;
  video: Video;
  videoProgress: Scalars['Int'];
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

export type Subtitles = {
  __typename?: 'Subtitles';
  _id: Scalars['ID'];
  fileName: Scalars['String'];
  language: Scalars['String'];
  path: Scalars['String'];
  title: Scalars['String'];
};

export type Torrent = {
  __typename?: 'Torrent';
  _id: Scalars['ID'];
  downloadInfo: DownloadInfo;
  files: Array<Video>;
  infoHash: Scalars['String'];
  magnet: Scalars['String'];
  name: Scalars['String'];
  size: Scalars['Int'];
  slug: Scalars['String'];
  status: TorrentState;
};

export enum TorrentState {
  Added = 'ADDED',
  Done = 'DONE',
  Downloading = 'DOWNLOADING',
  Error = 'ERROR',
  Paused = 'PAUSED',
  Processing = 'PROCESSING',
  Queued = 'QUEUED'
}

export type Video = {
  __typename?: 'Video';
  _id: Scalars['ID'];
  downloadInfo: VideoDownloadInfo;
  ext: Scalars['String'];
  name: Scalars['String'];
  path: Scalars['String'];
  progressPreview: Scalars['Boolean'];
  size: Scalars['Int'];
  slug: Scalars['String'];
  status: VideoState;
  subtitles: Array<Subtitles>;
};

export type VideoDownloadInfo = {
  __typename?: 'VideoDownloadInfo';
  downloaded: Scalars['Int'];
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


export type TorrentQuery = { __typename?: 'Query', torrent: { __typename?: 'Torrent', slug: string, name: string } };

export type VideoQueryVariables = Exact<{
  input: VideoInput;
}>;


export type VideoQuery = { __typename?: 'Query', video: { __typename?: 'Video', name: string } };

export type DiskUsageQueryVariables = Exact<{ [key: string]: never; }>;


export type DiskUsageQuery = { __typename?: 'Query', diskUsage: { __typename?: 'DiskUsage', free: number, size: number } };


export const TorrentDocument = gql`
    query Torrent($slug: String!) {
  torrent(slug: $slug) {
    slug
    name
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
export function useTorrentQuery(baseOptions: Apollo.QueryHookOptions<TorrentQuery, TorrentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TorrentQuery, TorrentQueryVariables>(TorrentDocument, options);
      }
export function useTorrentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TorrentQuery, TorrentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TorrentQuery, TorrentQueryVariables>(TorrentDocument, options);
        }
export type TorrentQueryHookResult = ReturnType<typeof useTorrentQuery>;
export type TorrentLazyQueryHookResult = ReturnType<typeof useTorrentLazyQuery>;
export type TorrentQueryResult = Apollo.QueryResult<TorrentQuery, TorrentQueryVariables>;
export const VideoDocument = gql`
    query Video($input: VideoInput!) {
  video(input: $input) {
    name
  }
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
 *   },
 * });
 */
export function useVideoQuery(baseOptions: Apollo.QueryHookOptions<VideoQuery, VideoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VideoQuery, VideoQueryVariables>(VideoDocument, options);
      }
export function useVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VideoQuery, VideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VideoQuery, VideoQueryVariables>(VideoDocument, options);
        }
export type VideoQueryHookResult = ReturnType<typeof useVideoQuery>;
export type VideoLazyQueryHookResult = ReturnType<typeof useVideoLazyQuery>;
export type VideoQueryResult = Apollo.QueryResult<VideoQuery, VideoQueryVariables>;
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
export function useDiskUsageQuery(baseOptions?: Apollo.QueryHookOptions<DiskUsageQuery, DiskUsageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DiskUsageQuery, DiskUsageQueryVariables>(DiskUsageDocument, options);
      }
export function useDiskUsageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DiskUsageQuery, DiskUsageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DiskUsageQuery, DiskUsageQueryVariables>(DiskUsageDocument, options);
        }
export type DiskUsageQueryHookResult = ReturnType<typeof useDiskUsageQuery>;
export type DiskUsageLazyQueryHookResult = ReturnType<typeof useDiskUsageLazyQuery>;
export type DiskUsageQueryResult = Apollo.QueryResult<DiskUsageQuery, DiskUsageQueryVariables>;