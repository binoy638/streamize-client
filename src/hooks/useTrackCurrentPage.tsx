import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { setCurrentPage } from '@/store/slice/UI.slice';

import { useTypedDispatch } from './useTypedDispatch';

const useTrackCurrentPage = () => {
  const router = useRouter();

  const dispatch = useTypedDispatch();

  useEffect(() => {
    switch (router.pathname) {
      case '/[torrent]':
        dispatch(setCurrentPage('torrent'));
        break;
      case '/[torrent]/[video]':
        dispatch(setCurrentPage('video'));
        break;
      case '/search':
        dispatch(setCurrentPage('search'));
        break;
      case '/signin':
        dispatch(setCurrentPage('signin'));
        break;
      default:
        dispatch(setCurrentPage('home'));
        break;
    }
  }, [router.pathname]);
};

export default useTrackCurrentPage;
