import "../styles/globals.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "react-query/devtools";
import type { AppProps } from "next/app";
import { useState } from "react";
import store from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
