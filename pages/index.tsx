import type { NextPage } from "next";
import Head from "next/head";
import AddedTorrentList from "../components/AddedTorrentList";
import Searchbar from "../components/search/Searchbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Streamize</title>
      </Head>
      <section className="px-4 py-4 lg:pt-6">
        <header className="font-balsamiqSans text-5xl font-bold flex justify-center">
          <h1>Streamize</h1>
        </header>
        <main className="pt-4 lg:px-56 lg:pt-10 font-lato">
          <Searchbar def="search" />
          <AddedTorrentList />
        </main>
      </section>
    </>
  );
};

export default Home;
