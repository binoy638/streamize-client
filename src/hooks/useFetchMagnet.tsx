import { useQuery } from '@tanstack/react-query';

import type { Provider } from '../@types';
import { fetchTorrentMagnet } from '../API';

function useFetchMagnet(provider: Provider, link: string) {
  return useQuery(
    ['magnet', provider, link],
    () => {
      if (provider === 'nyaa') {
        if (link) return link;
      }
      return fetchTorrentMagnet(provider, link);
    },
    {
      enabled: !!link,
    }
  );
}

export default useFetchMagnet;
