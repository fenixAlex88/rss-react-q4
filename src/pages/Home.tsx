import { useState, useEffect } from 'react';

import Search from '../components/Search/Search';
import CardList from '../components/CardList/CardList';
import Pagination from '../components/Pagination/Pagination';

import { IPerson } from '../interfaces/IPerson';
import { BASE_URL } from '../config/api.config';

import '../App.css';

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>(
    localStorage.getItem('search') || ''
  );
  const [results, setResults] = useState<IPerson[]>([]);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_URL}/?${query && `search=${query.trim()}&`}page=${page}`
        );
        const { results, count }: { results: IPerson[]; count: number } =
          await response.json();
        setResults(results);
        setError('');
        setTotal(count);
        localStorage.setItem('search', query as string);
      } catch (error) {
        setResults([]);
        setError(error instanceof Error ? error.message : 'Unexpected error');
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, [query, page]);

  useEffect(() => {
    if (page < 0) throw new Error('Test error');
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = event.target.value;
    setQuery(value);
    setPage(1);
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const page = Number(event.currentTarget.dataset.page);
    setPage(page);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setPage(1);
  };

  return (
    <div className="container">
      <Search
        query={query}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <hr />
      {isLoading ? (
        <div className="loader" />
      ) : (
        <CardList results={results} error={error} />
      )}
      <Pagination
        currentPage={page}
        total={total}
        handlePageChange={handlePageChange}
      />
      <button
        type="button"
        onClick={() => {
          setPage(-1);
        }}
        className="error-button"
      >
        Create an error
      </button>
    </div>
  );
};

export default Home;
