import React from 'react';

const PaginationAdmin = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div style={{position: 'fixed',
    bottom: 0,
    left: '55%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    padding: '30px 20px',
    display: 'inline-block',
    whiteSpace: 'nowrap'}}>
    <nav className="flex items-center -space-x-px">
      <button
        type="button"
        className={`min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 ${currentPage === 1 ? 'disabled:opacity-50 disabled:pointer-events-none' : ''}`}
        onClick={() => onPageChange(currentPage - 1)} // Handle click event to go to the previous page
        disabled={currentPage === 1 || totalPages === 1} // Disable button if on the first page or if there is only one page
      >
        <svg className="flex-shrink-0 size-3.5 text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span className="hidden sm:block text-blue-500 font-bold">Previous</span>
      </button>
      {[...Array(totalPages).keys()].map(page => (
        <button
          key={page + 1}
          type="button"
          className={`min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 font-bold ${page + 1 === currentPage ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-gray-100'}`}
          onClick={() => onPageChange(page + 1)} // Handle click event to change to the selected page
        >
          {page + 1}
        </button>
      ))}
      <button
        type="button"
        className={`min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 ${currentPage === totalPages ? 'disabled:opacity-50 disabled:pointer-events-none' : ''}`}
        onClick={() => onPageChange(currentPage + 1)} // Handle click event to go to the next page
        disabled={currentPage === totalPages || totalPages === 1} // Disable button if on the last page or if there is only one page
      >
        <span className="hidden sm:block text-blue-500 font-bold">Next</span>
        <svg className="flex-shrink-0 size-3.5 text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </nav>
    </div>
  );
};

export default PaginationAdmin;