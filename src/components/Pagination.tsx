import { usePersons } from '../context/PersonsContext';
import { useSearch } from '../context/SearchContext';
import Button from './UI/Button';
import classNames from 'classnames';

interface PaginationProps {
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  handlePageChange,
}) => {
  const { perPage } = useSearch();
  const total = usePersons().count;
  return (
    <div className="flex justify-center m-5">
      {Array.from(
        { length: Math.ceil((perPage == '10' ? total : total * 2) / 10) },
        (_, i) => i + 1
      ).map((page) => (
        <Button
          className={classNames({
            'shadow-xl opacity-80': page == currentPage,
          })}
          onClick={() => handlePageChange(page)}
          key={page}
        >
          {page}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
