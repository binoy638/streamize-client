import type { NextPage } from "next";
import Head from "next/head";
import AddedTorrentList from "../components/AddedTorrents";
import Searchbar from "../components/search/Searchbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Streamize</title>
      </Head>

      <Searchbar def="search" />
      <AddedTorrentList />
    </>
  );
};

export default Home;
