import { IMAGE_URL } from '../../config/api.config';
import { IPerson } from '../../interfaces/IPerson';

import './Card.css';

interface CardProps {
  person: IPerson;
}

const Card: React.FC<CardProps> = ({ person }) => {
  const cardTemplate: { key: string; name: string }[] = [
    { key: 'birth_year', name: 'Birth year' },
    { key: 'height', name: 'Height' },
    { key: 'mass', name: 'Mass' },
    { key: 'hair_color', name: 'Hair color' },
    { key: 'eye_color', name: 'Eye color' },
  ];

  return (
    <div className="card">
      <h3 className="card-title">{person.name}</h3>
      <img
        className="card-img"
        src={`${IMAGE_URL}/${person.url.match(/\d+/g)}.jpg`}
        alt="person.name"
      />
      <ul className="card-list">
        {cardTemplate.map((item) => (
          <li className="card-item" key={item.key}>
            <span className="card-key">{item.name}</span>
            <span className="card-value">
              {person[item.key as keyof IPerson]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
