import { IPerson } from '../interfaces/IPerson';

import Card from './Card';

interface CardListProps {
  results: IPerson[];
  error: string;
}

const CardList: React.FC<CardListProps> = ({ error, results }) => {
  if (error) {
    return <p className="text-2xl text-center mt-5 text-red-600">{error}</p>;
  }

  if (results.length === 0) {
    return (
      <p className="text-2xl text-center mt-5 text-gray-600">No results</p>
    );
  }

  return (
    <div className="flex flex-wrap justify-center m-5">
      {results.map((person) => (
        <Card person={person} key={person.url} />
      ))}
    </div>
  );
};

export default CardList;
