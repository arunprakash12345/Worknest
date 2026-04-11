import React from 'react';
import SearchIcon from '../../utils/images/search.svg';

const SearchInput = ({ placeholder }) => {
  return (
    <div className='relative w-full'>
      <img
        src={SearchIcon}
        alt="search-icon"
        className='absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 size-3.5'
      />
      <input
        type="text"
        placeholder={placeholder}
        className='border border-gray-200 pl-8 pr-4 py-2 rounded-md w-1/2 placeholder-gray-400 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition'
      />
    </div>
  );
};

export default SearchInput;