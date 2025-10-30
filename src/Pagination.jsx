import React from "react";
import { useApp, ACTION_TYPES } from "./Reducer";

const Pagination = ({ totalItems, pageSize, currentPage }) => {
  const { dispatch } = useApp();
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page) => {
    dispatch({ type: ACTION_TYPES.SET_CURRENT_PAGE, payload: page });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
        className="pagination-btn"
      >
        İlk
      </button>

      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="pagination-btn"
      >
        Geri
      </button>

      <span className="page-info">
        Sayfa {currentPage} / {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="pagination-btn"
      >
        İleri
      </button>

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
        className="pagination-btn"
      >
        Son
      </button>
    </div>
  );
};

export default Pagination;
