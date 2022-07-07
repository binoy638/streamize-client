import {
  PlusIcon,
  SearchIcon,
  SelectorIcon,
  XIcon
} from '@heroicons/react/solid';
import { useNotifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import useAddMagnet from '../../hooks/useAddMagnet';
import ProviderSelector from './ProviderSelector';

interface SearchbarProps {
  def: 'search' | 'add';
  showProviderSelector?: boolean;
}

function Searchbar({ def, showProviderSelector = false }: SearchbarProps) {
  const notifications = useNotifications();

  const [magnet, setMagnet] = useState<string>('');

  const router = useRouter();

  const [query, setQuery] = useState('');

  const [torrentProvider] = useState('1337x');

  const [type, setType] = useState<'search' | 'add'>(def);

  const { mutate } = useAddMagnet({
    successMessage: 'Torrent added to queue',
    onSuccessAction: () => {
      setMagnet('');
    }
  });

  const toggleHandler = () => {
    setType(prev => (prev === 'search' ? 'add' : 'search'));
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'search') {
      router.push({
        pathname: '/search',
        query: { q: query, p: torrentProvider }
      });
      return;
    }
    if (type === 'add') {
      if (magnet.length === 0) return;
      if (!magnet.startsWith('magnet:?xt=urn:btih:')) {
        notifications.showNotification({
          title: 'Torrent',
          message: 'invalid magnet link',
          color: 'red',
          icon: <XIcon className="h-4 w-4" />
        });

        return;
      }
      router.push({
        pathname: '/'
      });
      mutate(magnet);
    }
  };

  return (
    <div className="flex flex-col gap-2 text-black">
      <form onSubmit={onSubmitHandler} className="flex h-10">
        <button
          type="button"
          onClick={toggleHandler}
          className="rounded-l flex justify-center items-center gap-2 pl-4 pr-2 border-t border-l border-b bg-gray-200 border-gray-400  hover:opacity-80"
        >
          {type === 'search' ? 'Search' : 'Add'}
          <SelectorIcon className="h-5 w-5" />
        </button>
        {type === 'search' ? (
          <>
            <input
              type="text"
              onChange={e => setQuery(e.target.value)}
              value={query}
              placeholder="Enter movie name"
              className="w-full border-gray-400 border-t border-b focus:outline-none pl-4"
            />
            <button
              type="submit"
              className="bg-primary rounded-r px-4 border-t border-r border-b border-primary hover:opacity-80"
            >
              <SearchIcon className="h-5 w-5 text-white" />
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              onChange={e => setMagnet(e.target.value)}
              value={magnet}
              placeholder="Add magnet link"
              className="w-full border-gray-400 border-t border-b focus:outline-none pl-4"
            />
            <button
              type="submit"
              className="bg-primary rounded-r px-4 border-t border-r border-b border-primary hover:opacity-80"
            >
              <PlusIcon className="h-5 w-5 text-white" />
            </button>
          </>
        )}
      </form>

      {type === 'search' && showProviderSelector && <ProviderSelector />}
    </div>
  );
}

export default Searchbar;
