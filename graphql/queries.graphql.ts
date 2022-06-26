import { gql } from '@apollo/client';

export const GET_TORRENT = gql`
  query Torrent($slug: String!) {
    torrent(slug: $slug) {
      slug
      name
    }
  }
`;

export const GET_VIDEO = gql`
  query Video($input: VideoInput!) {
    video(input: $input) {
      name
    }
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
