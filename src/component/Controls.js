// src/components/Controls.js
import React from 'react';

const Controls = ({ validatePuzzle, solvePuzzle, resetPuzzle, giveHint, hintsRemaining }) => {
    return (
        <div className="buttonContainer">
            <button onClick={validatePuzzle}>Validate</button>
            <button onClick={solvePuzzle}>Solve</button>
            <button onClick={resetPuzzle}>Reset</button>
            <button onClick={giveHint} disabled={hintsRemaining === 0}>
                Hint ({hintsRemaining})
            </button>
        </div>
    );
};

export default Controls;