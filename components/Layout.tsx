import { AppShell, useMantineTheme } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import { verifyUser } from '../API';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { setUser } from '../store/slice/user.slice';
import Header from './Header';
import ScreenLoader from './ScreenLoader';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);

  const dispatch = useTypedDispatch();

  const router = useRouter();

  const { user } = useTypedSelector(state => state.user);

  const { mutate, isLoading } = useMutation(verifyUser, {
    onSuccess: response => {
      const { user } = response.data;
      dispatch(setUser(user));
    },
    onError: err => {
      console.log(err);
      router.push('/signin');
    }
  });

  useEffect(() => {
    if (user.id.length === 0) {
      mutate();
    }
  }, [user.id, mutate]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0]
          //   display: 'flex',
          //   width: '100%',
          //   justifyContent: 'center',
          //   alignItems: 'center'
        }
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<Sidebar show={opened} />}
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
