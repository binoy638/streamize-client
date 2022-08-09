import { UserIcon } from '@heroicons/react/solid';
import {
  Avatar,
  Burger,
  Header as HeaderComp,
  MediaQuery,
  useMantineTheme,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { signOut } from '../API';

interface HeaderProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  needAuth: boolean;
}

const Header = ({ opened, setOpened, needAuth }: HeaderProps) => {
  const router = useRouter();
  const { mutate } = useMutation(signOut, {
    onSuccess: () => {
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
              opened={opened}
              onClick={() => setOpened((o) => !o)}
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
                onClick={handleLogout}
              >
                <Avatar color="cyan" radius="xl">
                  <UserIcon className="h-5 w-5" />
                </Avatar>
              </span>
            )}
          </div>
          {/* <Text className="font-balsamiqSans">Application header</Text> */}
        </div>
      </HeaderComp>
    </>
  );
};

export default Header;
