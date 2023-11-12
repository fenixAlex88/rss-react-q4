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
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [results, setResults] = useState<IPerson[]>([]);
  const [searchValue, setSearchValue] = useState<string>(
    localStorageService.get('search') || ''
  );
  const setSearchParam = useSetSearchParam();
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const [perPage, setPerPage] = useState<string>('10');

  const handlePageChange = (page: number): void => {
    if (page) setSearchParam('page', page.toString());
    setPage(page);
  };

  const handleSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    setPage(1);
    setSearchParam('page', '1');
    setSearchParam('search', searchValue);
    fetchData();
  };

  const fetchData = useCallback(() => {
    setIsLoading(true);
    localStorageService.set('search', searchValue);
    fetchPersons(
      searchValue,
      perPage === '10' ? page.toString() : Math.ceil(page / 2).toString()
    )
      .then(({ count, results }) => {
        setCount(count);
        setResults(results);
      })
      .finally(() => setIsLoading(false));
  }, [searchValue, perPage, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData, page]);

  return (
    <div>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSubmit={handleSearchSubmit}
        perPage={perPage}
        setPerPage={setPerPage}
      />
      <hr />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <CardList
            results={
              perPage === '10'
                ? results
                : page % 2
                ? results.slice(0, 5)
                : results.slice(5)
            }
          />
          <Pagination
            currentPage={page}
            total={perPage === '10' ? count: count*2}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Home;
