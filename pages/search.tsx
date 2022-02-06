import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "../@types/store";
import useSearch from "../hooks/useSearch";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Home: NextPage = () => {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const [provider, setProvider] = useState<Provider>("rarbg");

  const { isLoading, error, data } = useSearch(query, provider);

  useEffect(() => {
    if (!router.isReady) return;
    const q = router?.query?.q;
    //! handle invalid provider
    const p = router?.query?.p as Provider;
    if (typeof q === "string" && typeof p === "string") {
      setQuery(q);
      setProvider(p);
    }
  }, [router, router.isReady]);

  return (
    <>
      <Head>
        <title>Streamize</title>
      </Head>
      <section className="px-4 py-4 lg:pt-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Something went wrong</div>
        ) : (
          <div>
            {data &&
              data.length > 0 &&
              data.map((item) => {
                return (
                  <div key={item.name}>
                    <a>{item.name}</a>
                  </div>
                );
              })}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
