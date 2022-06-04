import {
  Burger,
  Header as HeaderComp,
  MediaQuery,
  useMantineTheme
} from '@mantine/core';
import { Avatar } from '@mantine/core';
import Link from 'next/link';
import React, { FC } from 'react';

interface HeaderProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({ opened, setOpened }) => {
  const theme = useMantineTheme();

  return (
    <HeaderComp height={60} p="md">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened(o => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <div className="flex  w-full justify-between  h-full ">
          <Link href={'/'}>
            <span className="cursor-pointer text-2xl font-teko   text-primary  hover:opacity-75">
              Streamize
            </span>
          </Link>
          <span className="flex justify-center items-center">
            <Avatar color="cyan" radius="xl">
              B
            </Avatar>
          </span>
        </div>
        {/* <Text className="font-balsamiqSans">Application header</Text> */}
      </div>
    </HeaderComp>
  );
};

export default Header;
