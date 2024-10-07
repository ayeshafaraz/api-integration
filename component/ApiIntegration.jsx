// components/ApiIntegration.jsx
'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTokens, setSearch } from '../redux/slice/tokensSlice';

const ApiIntegration = () => {
  const dispatch = useDispatch();
  const { data: userData, search, status, error } = useSelector((state) => state.tokens);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTokens());
    }
  }, [dispatch, status]);

  const filteredData = userData.filter((data) =>
    data.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search by token name or symbol..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="mb-4 p-2 border border-gray-400 rounded w-full"
      />

      <div className="overflow-x-auto">
        {status === 'loading' && <div>Loading...</div>}
        {status === 'failed' && <div>Error: {error}</div>}
        {filteredData.length > 0 ? (
          <table className="min-w-full table-auto border border-red-500 color text-white">
            <thead>
              <tr>
                <th className="border border-gray-400 p-2">Token Name</th>
                <th className="border border-gray-400 p-2">Symbol</th>
                <th className="border border-gray-400 p-2">Address</th>
                <th className="border border-gray-400 p-2">Decimals</th>
                <th className="border border-gray-400 p-2">Image</th>
                <th className="border border-gray-400 p-2">Tags</th>
                <th className="border border-gray-400 p-2">Risk</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 p-2">{data.name}</td>
                  <td className="border border-gray-400 p-2">{data.symbol}</td>
                  <td className="border border-gray-400 p-2">{data.address}</td>
                  <td className="border border-gray-400 p-2">{data.decimals}</td>
                  <td className="border border-gray-400 p-2">{data.image}</td>
                  <td className="border border-gray-400 p-2">
                    {data.tags ? data.tags.join(', ') : 'No Tags'}
                  </td>
                  <td className="border border-gray-400 p-2">{data.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          status === 'succeeded' && <div>No data available</div>
        )}
      </div>
    </>
  );
};

export default ApiIntegration;
