import { useQuery } from '@tanstack/react-query';

import type { Provider } from '../@types/store';
import { searchTorrentAPI } from '../API';

function useSearch(query: string, provider: Provider) {
  return useQuery(
    ['search', query, provider],
    () => searchTorrentAPI(query, provider),
    {
      enabled: !!query,
    }
  );
}

export default useSearch;
