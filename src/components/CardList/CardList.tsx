import { IPerson } from '../../interfaces/IPerson';

import Card from '../Card/Card';

import './CardList.css';

interface CardListProps {
  results: IPerson[];
  error: string;
}

const CardList: React.FC<CardListProps> = ({ error, results }) => {
  if (error) {
    return <p className="error">{error}</p>;
  }

  if (results.length === 0) {
    return <p className="no-results">No results</p>;
  }

  return (
    <div className="results">
      {results.map((person) => (
        <Card person={person} key={person.url} />
      ))}
    </div>
  );
};

export default CardList;
