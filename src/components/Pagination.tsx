import Button from './UI/Button';
import classNames from 'classnames';

interface PaginationProps {
  currentPage: number;
  total: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  handlePageChange,
  total,
}) => {
  return (
    <div className="flex justify-center m-5">
      {Array.from({ length: Math.ceil(total / 10) }, (_, i) => i + 1).map(
        (page) => (
          <Button
            className={classNames({
              'shadow-xl opacity-80': page == currentPage,
            })}
            onClick={() => handlePageChange(page)}
            key={page}
          >
            {page}
          </Button>
        )
      )}
    </div>
  );
};

export default Pagination;
