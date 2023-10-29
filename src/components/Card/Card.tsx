import { Component } from 'react';
import { IPerson } from '../../interfaces/IPerson';
import './Card.css';

interface CardProps {
  person: IPerson;
}

class Card extends Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
  }

  cardTemplate: { key: string; name: string }[] = [
    { key: 'birth_year', name: 'Birth year' },
    { key: 'height', name: 'Height' },
    { key: 'mass', name: 'Mass' },
    { key: 'hair_color', name: 'Hair color' },
    { key: 'eye_color', name: 'Eye color' },
  ];

  render() {
    return (
      <div className="card">
        <h3 className="card-title">{this.props.person.name}</h3>
        <ul className="card-list">
          {this.cardTemplate.map((item) => (
            <li className="card-item" key={item.key}>
              <span className="card-key">{item.name}</span>
              <span className="card-value">
                {this.props.person[item.key as keyof IPerson]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Card;
