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
  needAuth: boolean;
}

const Layout: FC<LayoutProps> = ({ children, needAuth = true }) => {
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);

  const dispatch = useTypedDispatch();

  const router = useRouter();

  const { user } = useTypedSelector(state => state.user);

  const [loading, setLoading] = useState(true);

  const { mutate } = useMutation(verifyUser, {
    onSuccess: response => {
      const { user } = response.data;
      dispatch(setUser(user));
      setLoading(false);
    },
    onError: () => {
      router.push('/signin');
    }
  });

  useEffect(() => {
    if (!needAuth) {
      setLoading(false);
      return;
    }
    if (user.id.length === 0) {
      mutate();
    } else {
      setLoading(false);
    }
  }, [user.id, mutate, needAuth]);

  if (loading) {
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
        }
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<Sidebar show={opened} />}
      header={
        <Header needAuth={needAuth} opened={opened} setOpened={setOpened} />
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
