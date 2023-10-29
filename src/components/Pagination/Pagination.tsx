import React from 'react';

import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  total: number;
  handlePageChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

class Pagination extends React.Component<PaginationProps> {
  constructor(props: PaginationProps) {
    super(props);
  }

  render() {
    return (
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(this.props.total / 10) },
          (_, i) => i + 1
        ).map((page) => (
          <button
            className={`pagination-button ${
              page === this.props.currentPage ? 'active' : ''
            }`}
            data-page={page}
            onClick={this.props.handlePageChange}
            key={page}
          >
            {page}
          </button>
        ))}
      </div>
    );
  }
}

export default Pagination;
