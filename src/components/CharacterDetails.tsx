import { useCallback, useEffect, useRef } from 'react';
import {
  useLoaderData,
  useNavigate,
  useNavigation,
  useLocation,
} from 'react-router-dom';
import Button from './UI/Button';
import Spinner from './UI/Spinner';
import { ICharacterDetails } from '../interfaces/ICharacterDetails';

const CharacterDetails: React.FC = () => {
  const details = useLoaderData() as ICharacterDetails;
  const navigate = useNavigate();
  const { search } = useLocation();
  const { state } = useNavigation();
  const detailsTemplate: { key: string; name: string }[] = [
    { key: 'gender', name: 'Gender' },
    { key: 'height', name: 'Height' },
    { key: 'mass', name: 'Mass' },
    { key: 'birth_year', name: 'Birth year' },
    { key: 'hair_color', name: 'Hair color' },
    { key: 'skin_color', name: 'Skin color' },
    { key: 'eye_color', name: 'Eye color' },
  ];

  const detailsRef = useRef<null | HTMLElement>(null);

  const handleCloseSideMenu = useCallback(() => {
    navigate(`/${search}`);
  }, [navigate, search]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        handleCloseSideMenu();
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleCloseSideMenu]);
  return (
    <article
      className="flex flex-col border shadow-2xl bg-neutral-200 p-5 mt-8 rounded-2xl border-solid border-gray-300 self-start"
      ref={detailsRef}
    >
      {state === 'loading' ? (
        <Spinner />
      ) : (
        <>
          <h3 className="text-3xl text-center to-neutral-800-700 mb-5">
            {details.name}
          </h3>
          <ul className="w-60 mx-0 p-0">
            {detailsTemplate.map((property) => (
              <li
                className="flex justify-between items-center w-full"
                key={property.key}
              >
                <span className="text-base font-normal text-gray-500">
                  {property.name}
                </span>
                <span className="text-base font-bold text-gray-600">
                  {details[property.key as keyof ICharacterDetails]}
                </span>
              </li>
            ))}
          </ul>
          <Button onClick={handleCloseSideMenu} className="mt-10">
            Close details
          </Button>
        </>
      )}
    </article>
  );
};

export default CharacterDetails;
