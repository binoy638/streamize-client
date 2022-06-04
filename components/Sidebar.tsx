import {
  HomeIcon,
  PlayIcon,
  SearchIcon,
  UserAddIcon
} from '@heroicons/react/solid';
import { Navbar } from '@mantine/core';
import React, { FC } from 'react';

interface MenuItemProps {
  name: string;
  icon: JSX.Element;
}
const MenuItem: FC<MenuItemProps> = ({ name, icon }) => {
  return (
    <div className="flex gap-2">
      {icon}
      <span>{name}</span>
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
      style={{ gap: '1rem' }}
    >
      <MenuItem name="Home" icon={<HomeIcon className="h-5 w-5" />} />
      <MenuItem name="Library" icon={<PlayIcon className="h-5 w-5" />} />

      <MenuItem name="Search" icon={<SearchIcon className="h-5 w-5" />} />
      <MenuItem name="Add Torrent" icon={<UserAddIcon className="h-5 w-5" />} />
    </Navbar>
  );
};

export default Sidebar;
