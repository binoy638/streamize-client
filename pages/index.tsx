import type { NextPage } from 'next';

import Searchbar from '../components/Common/search/Searchbar';
import Snackbar from '../components/Common/Snackbar';
import AddedTorrentList from '../components/Home';

const Home: NextPage = () => {
  return (
    <>
      <Searchbar def="search" />
      <AddedTorrentList />
      <Snackbar />
    </>
  );
};

export default Home;
