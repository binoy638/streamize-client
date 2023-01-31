import { PlayIcon, SearchIcon } from '@heroicons/react/solid';
import { Navbar } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import { useTypedDispatch } from '@/hooks/useTypedDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import type { Pages } from '@/store/slice/UI.slice';
import { setShowSidebar } from '@/store/slice/UI.slice';

interface MenuItemProps {
  name: Pages;
  label: string;
  icon: JSX.Element;
  href: string;
}
const MenuItem = ({ name, icon, label, href }: MenuItemProps) => {
  const { currentPage } = useTypedSelector((state) => state.UI);
  const dispatch = useTypedDispatch();
  return (
    <Link href={href} passHref>
      <a
        onClick={() => dispatch(setShowSidebar(false))}
        className={`flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1  ${
          currentPage === name && 'bg-red-600 text-white'
        } `}
      >
        {icon}
        <span>{label}</span>
      </a>
    </Link>
  );
};

const Sidebar = () => {
  const { user } = useTypedSelector((state) => state.user);
  const { showSidebar } = useTypedSelector((state) => state.UI);
  if (!user.username) return null;
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!showSidebar}
      width={{ sm: 200, lg: 230 }}
      style={{ gap: '5px' }}
    >
      <MenuItem
        href="/"
        label="Library"
        name="home"
        icon={<PlayIcon className="h-5 w-5" />}
      />

      <MenuItem
        href="/search"
        name="search"
        label="Search"
        icon={<SearchIcon className="h-5 w-5" />}
      />
    </Navbar>
  );
};

export default Sidebar;
