import { Link, useRouteError } from 'react-router-dom';
import ErrorImg from '../assets/404.png'

const ErrorComponent = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={ErrorImg} alt="error" />
      <h2 className='text-3xl'>Something went wrong...</h2>
      <Link
        to="/"
        className="flex items-center justify-center h-10 bg-gray-800 text-white ml-2.5 mt-5 px-5"
      >
        Go Home
      </Link>
    </div>
  );
};
export default ErrorComponent;
