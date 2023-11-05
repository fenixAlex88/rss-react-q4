import { useNavigation } from 'react-router-dom';
import Spinner from './UI/Spinner';
import { ReactElement } from 'react';

interface WithLoaderProps {
  children: ReactElement;
}

const WithLoader: React.FC<WithLoaderProps> = ({ children }) => {
  const { state } = useNavigation();
  return (
    <>
      {state === 'loading' ? <Spinner /> : children}
    </>
  );
};
export default WithLoader;
