import { usePersons } from '../context/PersonsContext';
import { useSearch } from '../context/SearchContext';

import Card from './Card';

interface CardListProps {
  currentPage: number;
}

const CardList: React.FC<CardListProps> = ({ currentPage }) => {
  const { results } = usePersons();
  const { perPage } = useSearch();
  if (results.length === 0) {
    return (
      <p className="text-2xl text-center mt-5 text-gray-600">No results</p>
    );
  }

  return (
    <div className="flex flex-wrap justify-center m-5">
      {(perPage === '10'
        ? results
        : currentPage % 2
        ? results.slice(0, 5)
        : results.slice(5)
      ).map((person) => (
        <Card person={person} key={person.url} />
      ))}
    </div>
  );
};

export default CardList;
