import { useState, useEffect } from 'react';

import Search from '../components/Search/Search';
import CardList from '../components/CardList/CardList';
import Pagination from '../components/Pagination/Pagination';

import { IPerson } from '../interfaces/IPerson';

import localStorageService from '../services/localStorage.service';
import { fetchPeoples } from '../services/fetchData.service';

import '../App.css';

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>(
    localStorageService.get('search') || ''
  );
  const [results, setResults] = useState<IPerson[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);



  useEffect(() => {
    localStorageService.set('search', query as string);
    fetchPeoples(query, page).then(({ count, results }) => {
      setResults(results);
      setTotal(count);
    });
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

      <CardList results={results} error={''} />

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
