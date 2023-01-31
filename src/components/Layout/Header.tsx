import { LogoutIcon } from '@heroicons/react/outline';
import {
  Avatar,
  Burger,
  Header as HeaderComp,
  MediaQuery,
  Menu,
  useMantineTheme,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import client from '@/graphql/client';
import { useTypedDispatch } from '@/hooks/useTypedDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { setShowSidebar } from '@/store/slice/UI.slice';
import { clearUser } from '@/store/slice/user.slice';

import { signOut } from '../../API';

interface HeaderProps {
  needAuth: boolean;
}

const Header = ({ needAuth }: HeaderProps) => {
  const {
    user: { username },
  } = useTypedSelector((state) => state.user);

  const dispatch = useTypedDispatch();
  const { showSidebar } = useTypedSelector((state) => state.UI);
  const router = useRouter();
  const { mutate } = useMutation(signOut, {
    onSuccess: () => {
      dispatch(clearUser());
      client.clearStore();
      router.push('/signin');
    },
  });

  const theme = useMantineTheme();

  const handleLogout = () => {
    mutate();
  };

  return (
    <>
      <Head>
        <title>Streamize</title>
      </Head>

      <HeaderComp height={60} p="md">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={showSidebar}
              onClick={() => dispatch(setShowSidebar(!showSidebar))}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
          <div className="flex  h-full w-full  justify-between ">
            <Link href={'/'}>
              <span className="cursor-pointer font-teko text-2xl   text-primary  hover:opacity-75">
                Streamize
              </span>
            </Link>
            {needAuth && (
              <span
                className="flex cursor-pointer items-center justify-center"
                // onClick={handleLogout}
              >
                <Menu position="bottom-end">
                  <Menu.Target>
                    <Avatar color="cyan" radius="xl">
                      {username.charAt(0).toUpperCase()}
                    </Avatar>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={handleLogout}
                      icon={<LogoutIcon className="h-4 w-4" />}
                    >
                      Log out
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </span>
            )}
          </div>
        </div>
      </HeaderComp>
    </>
  );
};

export default Header;
