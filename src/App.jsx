import React, { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [numbers, setNumbers] = useState([]);
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [average, setAverage] = useState(0);

  const fetchNumbers = async (numberId) => {
    try {
      const response = await axios.get(`http://localhost:9876/numbers/${numberId}`);
      const { windowPrevState, windowCurrState, numbers, avg } = response.data;
      setWindowPrevState(windowPrevState);
      setWindowCurrState(windowCurrState);
      setNumbers(numbers);
      setAverage(avg);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  useEffect(() => {
    // Fetch numbers with ID 'e' (even) on initial load
    fetchNumbers('e');
  }, []);

  return (
    <div>
      <h1>Average Calculator</h1>
      <div>
        <button onClick={() => fetchNumbers('p')}>Fetch Prime Numbers</button>
        <button onClick={() => fetchNumbers('f')}>Fetch Fibonacci Numbers</button>
        <button onClick={() => fetchNumbers('e')}>Fetch Even Numbers</button>
        <button onClick={() => fetchNumbers('r')}>Fetch Random Numbers</button>
      </div>
      <div>
        <h2>Previous Window State</h2>
        <ul>
          {windowPrevState.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Current Window State</h2>
        <ul>
          {windowCurrState.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Numbers</h2>
        <ul>
          {numbers.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Average</h2>
        <p>{average.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default App;
