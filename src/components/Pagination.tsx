import { useEffect } from "react";
import "./Pagination.css";

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: Props) {
    useEffect(() => {
        if (totalPages === 0) {
            onPageChange(1);
        }
    }, [totalPages, currentPage, onPageChange]);
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="pagination">
            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="pagination-button"
            >
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className="pagination-button"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
