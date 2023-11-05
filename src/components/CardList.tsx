import { IPerson } from '../interfaces/IPerson';

import Card from './Card';
import { useNavigation } from 'react-router-dom';
import Spinner from './UI/Spinner';

interface CardListProps {
  results: IPerson[];
}

const CardList: React.FC<CardListProps> = ({ results }) => {
  const { state } = useNavigation();
  if (results.length === 0) {
    return (
      <p className="text-2xl text-center mt-5 text-gray-600">No results</p>
    );
  }

  return (
    <>
      {state == 'loading' ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap justify-center m-5">
          {results.map((person) => (
            <Card person={person} key={person.url} />
          ))}
        </div>
      )}
    </>
  );
};

export default CardList;
