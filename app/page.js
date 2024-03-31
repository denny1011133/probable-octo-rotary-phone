'use client';
import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  async function getRepos(search, currentPage) {
    const res = await fetch(
      `http://localhost:3000/api/repos?search=${search}&currentPage=${currentPage}`
    );

    return res.json();
  }

  function handleSearch(action) {
    if (search) {
      setLoading(true);
      if (action === 'next') {
        getRepos(search, currentPage + 1).then((res) => {
          console.log(res);
          const totalPages = Math.ceil(
            res.response.total_count / res.response.items.length
          );
          setTotalPages(totalPages);
          setRepos(res.response.items);
          setLoading(false);
          setCurrentPage((prev) => prev + 1);
        });
      } else {
        getRepos(search, currentPage).then((res) => {
          console.log(res);
          const totalPages = Math.ceil(
            res.response.total_count / res.response.items.length
          );
          setTotalPages(totalPages);
          setRepos(res.response.items);
          setLoading(false);
        });
      }
    } else {
      alert('empty search!');
    }
  }

  return (
    <>
      <div className="flex flex-row w-full items-center p-8 ">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          id="search"
          className="px-2 flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <label
          htmlFor="search"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 p-2 rounded cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </label>
      </div>
      <div className="flex justify-between px-5"></div>
      {loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : repos.length ? (
        <>
          <ul role="list" className="divide-y divide-gray-700 ">
            {repos.map((repo) => (
              <li key={repo.id} className="p-8">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <Link href={repo.html_url} target="_blank">
                      <p className="text-sm font-semibold leading-6 text-blue-500 underline text-underline-offset: 8px ">
                        {repo.full_name}
                      </p>
                    </Link>

                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {repo.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            {`${currentPage}/${totalPages}`}
          </div>
          <div className="flex justify-center gap-2">
            {currentPage === 1 ? null : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  handleSearch('prev');
                }}
              >
                Pre
              </button>
            )}
            {currentPage === totalPages ? null : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  handleSearch('next');
                }}
              >
                Next
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center">
          No result currently.
        </div>
      )}
    </>
  );
}
