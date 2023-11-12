import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import localStorageService from '../services/localStorage.service';

export const SearchContext = createContext<{
  searchValue: string;
  perPage: string;
}>({
  searchValue: '',
  perPage: '10',
});
interface SearchDispatchContextValue {
  setSearchValue: Dispatch<SetStateAction<string>>;
  setPerPage: Dispatch<SetStateAction<string>>;
}

export const SearchDispatchContext =
  createContext<SearchDispatchContextValue | null>(null);

interface SearchProviderProps {
  children: ReactNode;
}

export default function SearchProvider({ children }: SearchProviderProps) {
  const [searchValue, setSearchValue] = useState<string>(
    localStorageService.get('search') || ''
  );
  const [perPage, setPerPage] = useState<string>('10');

  return (
    <SearchContext.Provider value={{ searchValue, perPage }}>
      <SearchDispatchContext.Provider value={{ setSearchValue, setPerPage }}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}

// Custom hook to use search context
export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

// Custom hook to use search dispatch context
export function useSearchDispatch() {
  const context = useContext(SearchDispatchContext);
  if (!context) {
    throw new Error('useSearchDispatch must be used within a SearchProvider');
  }
  return context;
}
