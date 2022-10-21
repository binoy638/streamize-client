import { gql } from '@apollo/client';

export const ADD_WATCH_PARTY = gql`
  mutation addWatchParty($data: AddWatchPartyInput!) {
    addWatchParty(data: $data) {
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

export const DELETE_WATCH_PARTY = gql`
  mutation removeWatchParty($slug: String!) {
    removeWatchParty(slug: $slug)
  }
`;
