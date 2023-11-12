import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import localStorageService from '../services/localStorage.service';

export const SearchContext = createContext<string>('');
export const SearchDispatchContext = createContext<Dispatch<
  SetStateAction<string>
> | null>(null);

interface SearchProviderProps {
  children: ReactNode;
};

export default function SearchProvider({ children }: SearchProviderProps) {
  const [searchValue, setSearchValue] = useState<string>(
    localStorageService.get('search') || ''
  );

  return (
    <SearchContext.Provider value={searchValue}>
      <SearchDispatchContext.Provider value={setSearchValue}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}
