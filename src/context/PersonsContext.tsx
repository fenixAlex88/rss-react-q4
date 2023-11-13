import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { IPerson } from '../interfaces/IPerson';

type PersonsContextValue = {
  results: IPerson[];
  count: number;
};

interface PersonsDispatchContextValue {
  setResults: Dispatch<SetStateAction<IPerson[]>>;
  setCount: Dispatch<SetStateAction<number>>;
}

export const PersonsContext = createContext<PersonsContextValue>({
  results: [],
  count: 0,
});
export const PersonsDispatchContext =
  createContext<PersonsDispatchContextValue | null>(null);

interface PersonsProviderProps {
  children: ReactNode;
}

export default function PersonsProvider({ children }: PersonsProviderProps) {
  const [count, setCount] = useState<number>(0);
  const [results, setResults] = useState<IPerson[]>([]);

  return (
    <PersonsContext.Provider value={{ results, count }}>
      <PersonsDispatchContext.Provider value={{ setCount, setResults }}>
        {children}
      </PersonsDispatchContext.Provider>
    </PersonsContext.Provider>
  );
}

// Custom hook to use persons context
export function usePersons() {
  const context = useContext(PersonsContext);
  if (!context) {
    throw new Error('usePersons must be used within a PersonsProvider');
  }
  return context;
}

// Custom hook to use persons dispatch context
export function usePersonsDispatch() {
  const context = useContext(PersonsDispatchContext);
  if (!context) {
    throw new Error('usePersonsDispatch must be used within a PersonsProvider');
  }
  return context;
}
