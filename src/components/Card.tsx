import { IMAGE_URL } from '../config/api.config';
import { IPerson } from '../interfaces/IPerson';
import { Link, useLocation } from 'react-router-dom';

interface CardProps {
  person: IPerson;
}

const Card: React.FC<CardProps> = ({ person }) => {
  const { search } = useLocation();
  const id = person.url.match(/\d+/g);

  return (
    <Link
      className="flex flex-col items-center border shadow-lg bg-neutral-100 m-2.5 p-5 rounded-[10px] border-solid border-gray-300"
      to={`${id}${search}`}
    >
      <h3 className="text-2xl font-[bold] text-gray-800">{person.name}</h3>
      <img
        className="h-60 object-contain m-5"
        src={`${IMAGE_URL}/${id}.jpg`}
        alt="person.name"
      />
    </Link>
  );
};

export default Card;
