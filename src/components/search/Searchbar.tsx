import { Button, Chip, Input } from '@mantine/core';
import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import React, { useEffect, useState } from 'react';
import { ImSearch } from 'react-icons/im';

function SearchBar() {
  const router = useRouter();

  const site = router.query.site as string;

  const query = router.query.query as string;

  const page = router.query.page as string;

  const [provider, setProvider] = useState<string>('1337x');

  useEffect(() => {
    if (!router.isReady) return;

    if (
      site === '1337x' ||
      site === 'tpb' ||
      site === 'rarbg' ||
      site === 'nyaa'
    ) {
      setProvider(site);
    }
  }, [site, router.isReady]);

  useEffect(() => {
    if (provider === site || site === undefined) return;
    if (!query || query.length === 0) return;
    router.push({
      pathname: '/search',
      query: { query, site: provider, page },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  const submitHandler = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push({
      pathname: '/search',
      query: { query: event.target.query.value, site: provider, page: 1 },
    });
  };
  const rightSection = (
    <Button
      color="red"
      sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      type="submit"
    >
      <ImSearch />
    </Button>
  );
  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-6  ">
      <Input
        name="query"
        defaultValue={query}
        placeholder="Search..."
        rightSection={rightSection}
      />
      <div className="flex justify-center">
        <Chip.Group value={provider} multiple={false} onChange={setProvider}>
          <Chip color="red" value="1337x">
            1337x
          </Chip>
          <Chip color="red" value="rarbg">
            Rarbg
          </Chip>
          <Chip color="red" value="tpb">
            The Pirate Bay
          </Chip>
          <Chip color="red" value="nyaa">
            Nyaa
          </Chip>
        </Chip.Group>
      </div>
    </form>
  );
}

export default SearchBar;
