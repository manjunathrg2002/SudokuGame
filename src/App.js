// src/App.js
import React, { useState } from 'react';
import Sudoku from 'sudoku-umd';
import './App.css';
import SudokuGrid from './component/SudokuGrid';
import Controls from './component/Controls';
import ValidationMessage from './component/ValidationMessage';

const generateRandomSudoku = () => {
    const difficulty = 'easy';  // Adjust difficulty as needed
    const puzzle = Sudoku.generate(difficulty);
    return Sudoku.board_string_to_grid(puzzle);
};

const App = () => {
    const [initialPuzzle, setInitialPuzzle] = useState(generateRandomSudoku());
    const [puzzle, setPuzzle] = useState(JSON.parse(JSON.stringify(initialPuzzle)));
    const [solvedPuzzle, setSolvedPuzzle] = useState([]);
    const [validationResult, setValidationResult] = useState('');
    const [hintsRemaining, setHintsRemaining] = useState(5); // Maximum of 5 hints

    const validatePuzzle = () => {
        const isPuzzleValid = JSON.stringify(puzzle) === JSON.stringify(solvedPuzzle);
        setValidationResult(isPuzzleValid ? 'Correct' : 'Incorrect');
    };

    const solveSudoku = (board) => {
        const flattenedBoard = board.flat().join('').replace(/0/g, '.');
        const solved = Sudoku.solve(flattenedBoard);
        if (solved) {
            const solvedGrid = Sudoku.board_string_to_grid(solved);
            return solvedGrid;
        } else {
            console.log('Puzzle is not solvable.');
            return board;
        }
    };

    const solvePuzzle = () => {
        const solved = solveSudoku(puzzle);
        setPuzzle(solved);
        setSolvedPuzzle(solved);
    };

    const resetPuzzle = () => {
        const newPuzzle = generateRandomSudoku();
        setInitialPuzzle(newPuzzle);
        setPuzzle(JSON.parse(JSON.stringify(newPuzzle)));
        setSolvedPuzzle([]);
        setValidationResult('');
        setHintsRemaining(5); // Reset hints when resetting puzzle
    };

    const handleCellChange = (value, row, col) => {
        const newPuzzle = puzzle.map((r, rowIndex) =>
            r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? +value : cell))
        );
        setPuzzle(newPuzzle);
    };

    const clearCell = (row, col) => {
        const newPuzzle = puzzle.map((r, rowIndex) =>
            r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? 0 : cell))
        );
        setPuzzle(newPuzzle);
    };

    // Hint function
    const giveHint = () => {
        if (hintsRemaining > 0) {
            for (let row = 0; row < puzzle.length; row++) {
                for (let col = 0; col < puzzle[row].length; col++) {
                    if (puzzle[row][col] === 0) {
                        const flattenedBoard = puzzle.flat().join('').replace(/0/g, '.');
                        const solved = Sudoku.solve(flattenedBoard);
                        if (solved) {
                            const solvedGrid = Sudoku.board_string_to_grid(solved);
                            const hintValue = solvedGrid[row][col];
                            const newPuzzle = [...puzzle];
                            newPuzzle[row][col] = hintValue; // Set hint value in the puzzle
                            setPuzzle(newPuzzle);
                            setHintsRemaining(hintsRemaining - 1); // Decrease remaining hints
                            return;
                        }
                    }
                }
            }
            console.log('No empty cells available for hints.');
        } else {
            console.log('No hints remaining.');
        }
    };

    return (
        <div className="container">
            <h1>Sudoku Solver</h1>
            <SudokuGrid puzzle={puzzle} handleCellChange={handleCellChange} clearCell={clearCell} />
            <Controls 
                validatePuzzle={validatePuzzle} 
                solvePuzzle={solvePuzzle} 
                resetPuzzle={resetPuzzle} 
                giveHint={giveHint} 
                hintsRemaining={hintsRemaining} 
            />
            <ValidationMessage validationResult={validationResult} />
        </div>
    );
};

export default App;