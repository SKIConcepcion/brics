import React from 'react';

const PaginationCards = ({ currentPage, totalPages, onPageChange }) => {
  //checks if the current page is the first/last page
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  //to the previous page
  const handlePrevPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
    }
  };

  //to the next page
  const handleNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
    }
  };

  return (
    <nav className="flex items-center -space-x-px">
      <button
        type="button"
        className={`min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-10 text-black-800 hover:bg-blue-100 focus:outline-none focus:bg-black-100 disabled:pointer-events-none dark:border-neutral-700 dark:text-blue-500 dark:hover:bg-blue-50 dark:focus:bg-blue/10 ${isFirstPage ? 'pointer-events-none opacity-50' : ''}`}
        onClick={handlePrevPage}
        disabled={isFirstPage}
      >
        <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 24 24" fill="none" stroke="blue"strokeWidth="2"  strokeLinecap="round"strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span className="hidden sm:block"> Previous </span>
      </button>

      {/* Render page numbers */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          type="button"
          className={`min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-black hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-blue-500 dark:hover:bg-white/10 dark:focus:bg-white/10`}
          onClick={() => {
            onPageChange(index + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
          }}
          aria-current={currentPage === index + 1 ? 'page' : undefined}
        >
          {index + 1}
        </button>
      ))}

      <button
        type="button"
        className={`min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-blackhover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-blue-500 dark:hover:bg-blue-50 dark:focus:bg-blue/10 ${isLastPage ? 'pointer-events-none opacity-50' : ''}`}
        onClick={handleNextPage}
        disabled={isLastPage}
      >
        <span className="hidden sm:block">Next</span>
        <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </nav>
  );
};

export default PaginationCards;
