import { ArrowNarrowDownIcon, ArrowNarrowUpIcon } from '@heroicons/react/solid';
import { Pagination, Table } from '@mantine/core';
import { useRouter } from 'next/router';
import type { ReactElement, ReactNode } from 'react';
import React, { useEffect, useMemo, useState } from 'react';

import BarsSvg from '@/components/Common/BarsSvg';
import NotFound from '@/components/Common/NotFound';
import Layout from '@/components/Layout';
import SearchBar from '@/components/search/Searchbar';
import { TableBody } from '@/components/search/Table';

import type { Provider, SortMode, SortType } from '../@types';
import useSearch from '../hooks/useSearch';
import { nextSortState } from '../utils';

const SearchPageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <SearchBar />
      {children}
    </div>
  );
};

interface SortHeadersProps {
  label: string;
  sortState: SortMode;
  clickHandler: () => void;
}

const SortHeaders = ({ label, sortState, clickHandler }: SortHeadersProps) => {
  const Icon = useMemo(() => {
    if (sortState === 'asc') {
      return <ArrowNarrowUpIcon className="h-4 w-4 text-green-500" />;
    }

    if (sortState === 'desc') {
      return <ArrowNarrowDownIcon className="h-4 w-4 text-green-500" />;
    }
    return null;
  }, [sortState]);

  return (
    <th
      className={`cursor-pointer   ${sortState && 'flex'} items-center`}
      onClick={clickHandler}
    >
      {label}
      {Icon}
    </th>
  );
};

const Search = () => {
  const router = useRouter();

  const query = router.query.query as string;
  const site = router.query.site as Provider;
  const page = router.query.page as string;

  const [pageNo, setPageNo] = useState(1);

  const [sortType, setSortType] = useState<SortType>(null);
  const [sortMode, setSortMode] = useState<SortMode>(null);

  const { isLoading, isError, data } = useSearch(
    query,
    site,
    pageNo,
    sortType,
    sortMode
  );

  useEffect(() => {
    if (router.isReady) {
      setPageNo(Number(page));
    }
  }, [page, router.isReady]);

  const sortHandler = (type: SortType) => {
    setSortType(type);
    setSortMode(nextSortState(sortMode));
  };

  const sortStateHandler = (type: SortType): SortMode => {
    if (type === sortType) {
      return sortMode;
    }
    return null;
  };

  const handlePagination = (pageNumber: number) => {
    router.push({
      pathname: '/search',
      query: { query, site, page: pageNumber },
    });
  };

  if (!query) {
    return <SearchPageWrapper>{null}</SearchPageWrapper>;
  }

  if (isError)
    return (
      <SearchPageWrapper>
        <NotFound title="Something went wrong" />
      </SearchPageWrapper>
    );

  if (isLoading || !data)
    return (
      <SearchPageWrapper>
        <div className="flex h-96 items-center justify-center">
          <BarsSvg />
        </div>
      </SearchPageWrapper>
    );

  if (data.torrents.length === 0) {
    return (
      <SearchPageWrapper>
        <div className="flex h-96 items-center justify-center">
          <NotFound title="No results found" />
        </div>
      </SearchPageWrapper>
    );
  }

  return (
    <SearchPageWrapper>
      <div className="mt-8 overflow-hidden overflow-x-scroll scrollbar-hide lg:overflow-x-hidden">
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>Name</th>

              <SortHeaders
                label="Size"
                sortState={sortStateHandler('size')}
                clickHandler={() => sortHandler('size')}
              />

              <SortHeaders
                label="Seeds"
                sortState={sortStateHandler('seeders')}
                clickHandler={() => sortHandler('seeders')}
              />
              <SortHeaders
                label="Leeches"
                sortState={sortStateHandler('leechers')}
                clickHandler={() => sortHandler('leechers')}
              />

              <SortHeaders
                label="Added"
                sortState={sortStateHandler('time')}
                clickHandler={() => sortHandler('time')}
              />

              <th>Uploader</th>
            </tr>
          </thead>

          <TableBody torrents={data.torrents} />
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <Pagination
          page={pageNo}
          onChange={handlePagination}
          total={data.totalPages}
        />
      </div>
    </SearchPageWrapper>
  );
};

export default Search;

Search.getLayout = (page: ReactElement) => (
  <Layout needAuth={true}>{page}</Layout>
);
