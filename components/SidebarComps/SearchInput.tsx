"use client"
import React, { ChangeEvent, useState } from 'react'
import { GoSearch } from 'react-icons/go';

const SearchInput = () => {
  const [expanded , setExpanded] = useState(false);
  const [query, setQuery] = useState('');

  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <>
    <div className={`relative transition-width mx-[6px] ease-in-out bg-[#f2f3f8] duration-300 border-[1px]  rounded-full ${expanded ? 'w-auto' : '0'} overflow-hidden flex`}>
          <button
            onClick={handleToggleExpand}
            className="p-2"
          >
            <GoSearch color='#b8bfd3'/>
          </button>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleInputChange}
            className={` transition-width ease-in-out bg-[#f2f3f8] placeholder-[#b8bfd3] duration-300 outline-none ${expanded? "w-[300px] p-1 flex-grow " : "w-0"}`}
          />
        </div>
    </>
  )
}

export default SearchInput