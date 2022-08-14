import {
  HomeIcon,
  PlayIcon,
  SearchIcon,
  UserAddIcon,
} from '@heroicons/react/solid';
import { Navbar } from '@mantine/core';
import { openModal } from '@mantine/modals';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import React from 'react';

import { useTypedDispatch } from '@/hooks/useTypedDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import type { SidebarItems } from '@/store/slice/UI.slice';
import { setActiveItem } from '@/store/slice/UI.slice';

import AddMagnetForm from '../forms/AddMagnet';

interface MenuItemProps {
  name: SidebarItems;
  label: string;
  icon: JSX.Element;
}
const MenuItem = ({ name, icon, label }: MenuItemProps) => {
  const {
    sidebar: { activeItem },
  } = useTypedSelector((state) => state.UI);

  const dispatch = useTypedDispatch();

  const router = useRouter();

  const handleClick = () => {
    dispatch(setActiveItem(name));
    if (name === 'add-torrent') {
      openModal({
        title: 'Add Torrent',
        children: <AddMagnetForm />,
      });
    }
    if (name === 'home') {
      router.push('/');
    }
  };
  return (
    <div
      onClick={handleClick}
      className={`flex cursor-pointer items-center gap-2 rounded-sm  ${
        activeItem === name && 'bg-red-600 text-white'
      } px-2 py-1  `}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

interface SidebarProps {
  show: boolean;
}
const Sidebar: FC<SidebarProps> = ({ show }) => {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!show}
      width={{ sm: 200, lg: 230 }}
      style={{ gap: '5px' }}
    >
      <MenuItem
        label="Home"
        name="home"
        icon={<HomeIcon className="h-5 w-5" />}
      />
      <MenuItem
        label="Library"
        name="lib"
        icon={<PlayIcon className="h-5 w-5" />}
      />

      <MenuItem
        name="search"
        label="Search"
        icon={<SearchIcon className="h-5 w-5" />}
      />
      <MenuItem
        label="Add Torrent"
        name="add-torrent"
        icon={<UserAddIcon className="h-5 w-5" />}
      />
    </Navbar>
  );
};

export default Sidebar;
