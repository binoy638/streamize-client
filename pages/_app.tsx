import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';

import Layout from '../components/Common/Layout';
import store from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
