import { useQuery } from '@tanstack/react-query';

import type { Provider, SortMode, SortType } from '../@types';
import { searchTorrentAPI } from '../API';

function useSearch(
  query: string,
  provider: Provider,
  page: number,
  sortType: SortType,
  sortMode: SortMode
) {
  return useQuery(
    ['search', query, page, provider, sortType, sortMode],
    () => {
      if (!query || !provider) return;
      if (sortMode && !sortType) return;
      if (sortType && !sortMode) return;
      // eslint-disable-next-line consistent-return
      return searchTorrentAPI(query, provider, page, sortType, sortMode);
    },
    {
      enabled: !!query,
    }
  );
}

export default useSearch;
