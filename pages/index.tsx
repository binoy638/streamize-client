import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import { verifyUser } from '../API';
import AddedTorrentList from '../components/Home';
import Layout from '../components/Layout';
import ScreenLoader from '../components/ScreenLoader';
import Searchbar from '../components/search/Searchbar';

const Home = () => {
  // const [loading, setLoading] = useState(true);

  // const router = useRouter();

  // const { mutate } = useMutation(verifyUser, {
  //   onSuccess: () => {
  //     setLoading(false);
  //   },
  //   onError: () => {
  //     router.push('/signin');
  //   }
  // });

  // useEffect(() => {
  //   mutate();
  // }, []);

  return (
    // <>
    //   {loading ? (
    //     <ScreenLoader />
    //   ) : (
    <Layout>
      <Searchbar def="search" />
      <AddedTorrentList />
    </Layout>
    //   )}
    // </>
  );
};

export default Home;
