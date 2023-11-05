import { useCallback, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import CardList from '../components/CardList';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import Spinner from '../components/UI/Spinner';
import { useSetSearchParam } from '../hooks/useSetSearchParam';
import { fetchPersons } from '../services/fetchData.service';
import localStorageService from '../services/localStorage.service';
import { IPerson } from '../interfaces/IPerson';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [results, setResults] = useState<IPerson[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchParams] = useSearchParams();
  const setSearchParam = useSetSearchParam();
  let page = Number(searchParams.get('page')) || 1;

  const handlePageChange = (page: number): void => {
    if (page) setSearchParam('page', page.toString());
  };

  const handleSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    page = 1;
    setSearchParam('page', '1');
    if (searchValue) setSearchParam('search', searchValue);
    fetchData();
  };

  const fetchData = useCallback(() => {
    setIsLoading(true);
    localStorageService.set('search', searchValue);
    fetchPersons(searchValue, page.toString())
      .then(({ count, results }) => {
        setCount(count);
        setResults(results);
      })
      .finally(() => setIsLoading(false));
  }, [page, searchValue]);

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSubmit={handleSearchSubmit}
      />
      <hr />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <CardList results={results} />
          <Pagination
            currentPage={page}
            total={count}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Home;
