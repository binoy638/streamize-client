import AddedTorrentList from '../components/Home';
import Layout from '../components/Layout';
import Searchbar from '../components/search/Searchbar';

const Home = () => {
  return (
    <Layout needAuth={true}>
      <Searchbar def="search" />
      <AddedTorrentList />
    </Layout>
  );
};

export default Home;
