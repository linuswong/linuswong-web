import './CheckeredFlag.css';

const CheckeredFlag = () => {
  // Generate enough squares to fill the width - CSS will handle the responsive layout
  const rows = 4;
  const cols = 50; // More columns, CSS will show fewer based on viewport
  
  return (
    <div className="checkered-flag-section">
      <div className="checkered-pattern">
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="pattern-row">
            {Array.from({ length: cols }).map((_, col) => (
              <div
                key={col}
                className={`pattern-square ${(row + col) % 2 === 0 ? 'white' : 'black'}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckeredFlag;

