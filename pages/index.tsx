import type { NextPage } from 'next';

import AddedTorrentList from '../components/Home';
import Searchbar from '../components/search/Searchbar';

const Home: NextPage = () => {
  return (
    <>
      <Searchbar def="search" />
      <AddedTorrentList />
    </>
  );
};

export default Home;
