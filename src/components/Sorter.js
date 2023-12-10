// Sorter.js

import React, { useState } from 'react';

const Sorter = () => {
  const [inputArray, setInputArray] = useState('');
  const [sortingType, setSortingType] = useState('single');
  const [sortedArray, setSortedArray] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);

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
      setTimeTaken(result.time_ns); // Assuming you've adjusted the time unit
    } catch (error) {
      console.error('Error during API call:', error);
      // Handle the error, e.g., display an error message to the user
    }
  };
  

  return (
    <div>
      <h2>Array Sorter</h2>
      <div>
        <label>
          Enter Arrays (e.g., [[3, 1, 2], [5, 4, 6]]):
          <textarea value={inputArray} onChange={handleInputChange} />
        </label>
      </div>
      <div>
        <label>
          Sorting Type:
          <select value={sortingType} onChange={handleSortingTypeChange}>
            <option value="single">Single</option>
            <option value="concurrent">Concurrent</option>
          </select>
        </label>
      </div>
      <div>
        <button onClick={handleSortClick}>Sort</button>
      </div>
      {sortedArray.length > 0 && (
        <div>
          <h3>Sorted Array:</h3>
          <pre>{JSON.stringify(sortedArray, null, 2)}</pre>
          <p>Time taken: {timeTaken} ns</p>
        </div>
      )}
    </div>
  );
};

export default Sorter;
