import { IMAGE_URL } from '../config/api.config';
import { IPerson } from '../interfaces/IPerson';

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
    <div className="flex flex-col items-center min-w-[300px] min-h-[400px] border shadow-lg bg-neutral-100 m-2.5 p-5 rounded-[10px] border-solid border-gray-300">
      <h3 className="text-2xl font-[bold] text-gray-800">{person.name}</h3>
      <img
        className="h-60 object-contain m-5"
        src={`${IMAGE_URL}/${person.url.match(/\d+/g)}.jpg`}
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
    </div>
  );
};

export default Card;
