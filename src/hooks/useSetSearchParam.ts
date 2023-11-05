import { useSearchParams } from 'react-router-dom';

export const useSetSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const setSearchParam = (name: string, value: string) => {
    newSearchParams.set(name, value);
    const searchString = newSearchParams.toString();
    setSearchParams(searchString);
  };
  return setSearchParam;
};
