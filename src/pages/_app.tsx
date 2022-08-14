/* eslint-disable @typescript-eslint/ban-types */
import '../styles/globals.scss';

import { ApolloProvider } from '@apollo/client';
import type { ColorScheme } from '@mantine/core';
import {
  ColorSchemeProvider,
  createEmotionCache,
  MantineProvider,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { useState } from 'react';
import { Provider } from 'react-redux';

import client from '../graphql/client';
import store from '../store';

const appendCache = createEmotionCache({ key: 'mantine', prepend: false });

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              emotionCache={appendCache}
              theme={{
                colorScheme: 'dark',
              }}
            >
              <NotificationsProvider>
                <ModalsProvider>
                  {getLayout(<Component {...pageProps} />)}
                </ModalsProvider>
              </NotificationsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </QueryClientProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
