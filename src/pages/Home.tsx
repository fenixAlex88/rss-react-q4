import { useLoaderData } from 'react-router-dom';

import { useSetSearchParam } from '../hooks/useSetSearchParam';
import Search from '../components/Search/Search';
import CardList from '../components/CardList/CardList';
import Pagination from '../components/Pagination/Pagination';

import { IPerson } from '../interfaces/IPerson';

import { fetchPersons } from '../services/fetchData.service';

import '../App.css';
import React from 'react';

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

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    searchQuery: string
  ): void => {
    event.preventDefault();
    if (searchQuery) setSearchParam('search', searchQuery);
  };

  return (
    <div className="container">
      <Search handleSubmit={handleSubmit} />
      <hr />

      <CardList results={results} error={''} />

      <Pagination
        currentPage={page}
        total={count}
        handlePageChange={handlePageChange}
      />
      <button type="button" onClick={() => {}} className="error-button">
        Create an error
      </button>
    </div>
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
