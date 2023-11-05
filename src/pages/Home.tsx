import { useLoaderData, Outlet } from 'react-router-dom';

import { useSetSearchParam } from '../hooks/useSetSearchParam';
import CardList from '../components/CardList';
import Pagination from '../components/Pagination';

import { IPerson } from '../interfaces/IPerson';

import { fetchPersons } from '../services/fetchData.service';

import '../App.css';
import React from 'react';
import WithLoader from '../components/WithLoader';

const Home: React.FC = () => {
  const { count, results, page } = useLoaderData() as {
    count: number;
    results: IPerson[];
    page: number;
  };
  const setSearchParam = useSetSearchParam();

  const handlePageChange = (page: number): void => {
    if (page) setSearchParam('page', page.toString());
  };

  return (
    <>
      <WithLoader>
        <>
          <CardList results={results} />
          <Pagination
            currentPage={page}
            total={count}
            handlePageChange={handlePageChange}
          />
        </>
      </WithLoader>
      <Outlet />
      <button type="button" onClick={() => {}} className="error-button">
        Create an error
      </button>
    </>
  );
};

export default Home;

export const personsLoader = async ({
  request,
}: {
  request: { url: string };
}): Promise<{
  count: number;
  results: IPerson[];
  page: string;
}> => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const name = searchParams.get('search') || '';
  const page = searchParams.get('page') || '1';
  const { count, results } = await fetchPersons(name, page);
  return { count, results, page };
};
