import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';

const Explorer = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = debounce(async (query) => {
    if (!query) {
      setResults([]);
      setNoResults(false);
      return;
    }

    try {
      const res = await axios.get(`/user/search?query=${query}`);
      if (res.data.users.length === 0) {
        setNoResults(true);
        setResults([]);
      } else {
        setNoResults(false);
        setResults(res.data.users);
      }
    } catch (error) {
      console.error(error.message);
    }
  }, 300); // Debounce with 300ms delay

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg w-[30%]  mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Explorer</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users by name..."
        className="p-4 outline-none border-none rounded-lg w-full mb-4 text-gray-700 focus:ring-2 focus:ring-blue-500 shadow-inner"
      />
      <div className="transition-all duration-300">
        {noResults ? (
          <p className="text-center text-gray-500 mt-4">No users found.</p>
        ) : (
          results.map((user) => (
            <div
              key={user._id}
              className="p-4 mb-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <Link to={`/profile/${user._id}`}>
                <h2 className="font-bold text-lg text-gray-800">{user.name}</h2>
                <p className="text-gray-500">@{user.username}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Explorer;
