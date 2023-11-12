import { useCallback, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import CardList from '../components/CardList';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import Spinner from '../components/UI/Spinner';
import { useSetSearchParam } from '../hooks/useSetSearchParam';
import { fetchPersons } from '../services/fetchData.service';
import localStorageService from '../services/localStorage.service';
import { usePersonsDispatch } from '../context/PersonsContext';
import { useSearch } from '../context/SearchContext';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setCount, setResults } = usePersonsDispatch();
  const [searchParams] = useSearchParams();
  const setSearchParam = useSetSearchParam();
  const {searchValue, perPage} = useSearch();
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  
  const handlePageChange = (page: number): void => {
    if (page) setSearchParam('page', page.toString());
    setPage(page);
  };

  const handleSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    console.log(event);
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
  }, [searchValue, perPage, page, setCount, setResults]);

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div>
      <Search handleSubmit={handleSearchSubmit} />
      <hr />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <CardList currentPage={page} />
          <Pagination currentPage={page} handlePageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};

export default Home;
