import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  total: number;
  handlePageChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  handlePageChange,
  total,
}) => {
  return (
    <div className="pagination">
      {Array.from({ length: Math.ceil(total / 10) }, (_, i) => i + 1).map(
        (page) => (
          <button
            className={`pagination-button ${
              page === currentPage ? 'active' : ''
            }`}
            data-page={page}
            onClick={handlePageChange}
            key={page}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;
