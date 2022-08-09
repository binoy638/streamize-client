import { AppShell, useMantineTheme } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

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

  const { user } = useTypedSelector((state) => state.user);

  const [loading, setLoading] = useState(true);

  const { mutate } = useMutation(verifyUser, {
    onSuccess: (response) => {
      const { user: User } = response.data;
      dispatch(setUser(User));
      setLoading(false);
    },
    onError: () => {
      if (needAuth) {
        router.push('/signin');
      } else {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    // if (!needAuth) {
    //   setLoading(false);
    //   return;
    // }
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
              : theme.colors.gray[0],
        },
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
