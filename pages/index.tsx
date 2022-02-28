import type { NextPage } from 'next';

import Searchbar from '../components/Common/search/Searchbar';
import AddedTorrentList from '../components/Home';

const Home: NextPage = () => {
  return (
    <>
      <Searchbar def="search" />
      <AddedTorrentList />
    </>
  );
};

export default Home;
