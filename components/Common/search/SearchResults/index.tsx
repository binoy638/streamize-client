/* eslint-disable unicorn/no-nested-ternary */
import React from 'react';

import { TorrentData } from '../../../../@types/store';
import Error from './Error';
import Loading from './Loading';
import Results from './Results';

interface SearchResultsProps {
  isLoading: boolean;
  error: unknown;
  data: TorrentData[] | undefined;
}

function SearchResults({ isLoading, error, data }: SearchResultsProps) {
  return isLoading ? (
    <Loading />
  ) : error ? (
    <Error />
  ) : (
    <>{data && data.length > 0 && <Results data={data} />}</>
  );
}

export default SearchResults;
