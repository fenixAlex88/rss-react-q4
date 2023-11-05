import './Pagination.css';

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
    <div className="pagination">
      {Array.from({ length: Math.ceil(total / 10) }, (_, i) => i + 1).map(
        (page) => (
          <button
            className={`pagination-button ${
              page === currentPage ? 'active' : ''
            }`}
            data-page={page}
            onClick={()=>handlePageChange(page)}
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
