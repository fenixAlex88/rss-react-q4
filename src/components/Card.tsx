import { IMAGE_URL } from '../config/api.config';
import { IPerson } from '../interfaces/IPerson';
import { Link, useLocation } from 'react-router-dom';

interface CardProps {
  person: IPerson;
}

const Card: React.FC<CardProps> = ({ person }) => {
  const { search } = useLocation();
  const id = person.url.match(/\d+/g);
  const cardTemplate: { key: string; name: string }[] = [
    { key: 'birth_year', name: 'Birth year' },
    { key: 'height', name: 'Height' },
    { key: 'mass', name: 'Mass' },
    { key: 'hair_color', name: 'Hair color' },
    { key: 'eye_color', name: 'Eye color' },
  ];

  return (
    <Link
      className="flex flex-col items-center min-w-[300px] min-h-[400px] border shadow-lg bg-neutral-100 m-2.5 p-5 rounded-[10px] border-solid border-gray-300"
      to={`${id}${search}`}
    >
      <h3 className="text-2xl font-[bold] text-gray-800">{person.name}</h3>
      <img
        className="h-60 object-contain m-5"
        src={`${IMAGE_URL}/${id}.jpg`}
        alt="person.name"
      />
      <ul className="w-60 mx-0 p-0">
        {cardTemplate.map((item) => (
          <li
            className="flex justify-between items-center w-full"
            key={item.key}
          >
            <span className="text-base font-normal text-gray-500">
              {item.name}
            </span>
            <span className="text-base font-bold text-gray-600">
              {person[item.key as keyof IPerson]}
            </span>
          </li>
        ))}
      </ul>
    </Link>
  );
};

export default Card;
