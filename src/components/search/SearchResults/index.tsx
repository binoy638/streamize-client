import React from 'react';

import type { TorrentData } from '../../../@types/store';
import Error from './Error';
import Loading from './Loading';
import Results from './Results';

interface SearchResultsProps {
  isLoading: boolean;
  error: unknown;
  data: TorrentData[] | undefined;
}

function SearchResults({ isLoading, error, data }: SearchResultsProps) {
  if (isLoading) return <Loading />;

  if (error) return <Error />;

  if (!data) return null;

  return <Results data={data} />;
}

export default SearchResults;
