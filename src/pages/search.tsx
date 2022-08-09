import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { Provider } from '../@types/store';
import Searchbar from '../components/search/Searchbar';
import SearchResults from '../components/search/SearchResults';
import useSearch from '../hooks/useSearch';

const Home: NextPage = () => {
  const router = useRouter();

  const [query, setQuery] = useState('');

  const [provider, setProvider] = useState<Provider>('1337x');

  const { isLoading, error, data } = useSearch(query, provider);

  useEffect(() => {
    if (!router.isReady) return;
    const q = router?.query?.q;
    //! handle invalid provider
    const p = router?.query?.p as Provider;
    if (typeof q === 'string' && typeof p === 'string') {
      setQuery(q);
      setProvider(p);
    }
  }, [router, router.isReady]);

  return (
    <>
      <Head>
        <title>Search: {query}</title>
      </Head>

      <Searchbar def="search" />
      <SearchResults isLoading={isLoading} error={error} data={data} />
    </>
  );
};

export default Home;
