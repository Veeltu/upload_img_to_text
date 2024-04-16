import React, { useState, useEffect } from 'react';

const NumberMatrixBox: React.FC = () => {
  const [numbers, setNumbers] = useState<number[][]>(generateRandomNumbers());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNumbers(generateRandomNumbers());
    }, 100); // Change the interval as needed (in milliseconds)

    return () => clearInterval(intervalId);
  }, []);

  function generateRandomNumbers(): number[][] {
    // You can customize the logic to generate your desired numbers
    const matrix: number[][] = [];
    const numRows = 10; // Adjust the number of rows as needed
    const numCols = 10; // Set the number of columns to 10

    for (let i = 0; i < numRows; i++) {
      const row: number[] = [];
      for (let j = 0; j < numCols; j++) {
        row.push(Math.floor(Math.random() * 10));
      }
      matrix.push(row);
    }
    return matrix;
  }

  return (
    <div className="number-matrix-box">
      {numbers.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((number, colIndex) => (
            <div key={colIndex} className="number">
              {number}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NumberMatrixBox;
