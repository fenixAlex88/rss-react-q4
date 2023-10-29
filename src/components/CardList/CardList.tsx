import { Component } from 'react';
import Card from '../Card/Card';
import { IPerson } from '../../interfaces/IPerson';
import './CardList.css';

interface CardListProps {
  results: IPerson[];
  error: string;
}

class CardList extends Component<CardListProps> {
  constructor(props: CardListProps) {
    super(props);
  }

  render() {
    if (this.props.error) {
      return <p className="error">{this.props.error}</p>;
    }

    if (this.props.results.length === 0) {
      return <p className="no-results">No results</p>;
    }

    return (
      <div className="results">
        {this.props.results.map((person) => (
          <Card person={person} key={person.url} />
        ))}
      </div>
    );
  }
}

export default CardList;
