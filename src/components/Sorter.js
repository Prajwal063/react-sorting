// Sorter.js

import React, { useState } from 'react';

const Sorter = () => {
  const [inputArray, setInputArray] = useState('');
  const [sortingType, setSortingType] = useState('single');
  const [sortedArray, setSortedArray] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputArray(e.target.value);
  };

  const handleSortingTypeChange = (e) => {
    setSortingType(e.target.value);
  };

  const handleSortClick = async () => {
    try {
      const response = await fetch(`https://array-sorting-go.onrender.com/process-${sortingType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ to_sort: JSON.parse(inputArray) }),
      });
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const result = await response.json();
      setSortedArray(result.sorted_arrays);
      setTimeTaken(result.time_ns); 
      setError(null); 
    } catch (error) {
      console.error('Error during API call:', error);
      setError(error.message); 
    }
  };
  

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Array Sorter</h2>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Enter Arrays (e.g., [[3, 1, 2], [5, 4, 6]]):
          <textarea
            value={inputArray}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px', height: '150px', resize: 'vertical' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Sorting Type:
          <select
            value={sortingType}
            onChange={handleSortingTypeChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', borderRadius: '4px' }}
          >
            <option value="single">Single</option>
            <option value="concurrent">Concurrent</option>
          </select>
        </label>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleSortClick}
          style={{ backgroundColor: '#4caf50', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
        >
          Sort
        </button>
      </div>
      {error && (
        <div style={{ marginTop: '20px', textAlign: 'center', color: 'red' }}>
          <p>{error}</p>
        </div>
      )}
      {sortedArray.length > 0 && (
        
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ textAlign: 'center' }}>Sorted Array:</h3>
          <pre style={{ padding: '10px', borderRadius: '4px', backgroundColor: '#f4f4f4', overflowX: 'auto' }}>
          <p style={{ textAlign: 'center' }}>Time taken: {timeTaken} ns</p>

            {JSON.stringify(sortedArray, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Sorter;
