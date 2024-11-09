// src/components/SudokuGrid.js
import React, { useState } from 'react';
import './Sudoku.css'; // Ensure this file has the updated styles

const SudokuGrid = ({ puzzle, handleCellChange, clearCell }) => {
    const [selectedCell, setSelectedCell] = useState(null); // Track selected cell

    const handleCellClick = (rowIndex, colIndex) => {
        setSelectedCell({ rowIndex, colIndex });
    };

    const isSelected = (rowIndex, colIndex) => {
        return selectedCell && selectedCell.rowIndex === rowIndex && selectedCell.colIndex === colIndex;
    };

    const isRowHighlighted = (rowIndex) => {
        return selectedCell && selectedCell.rowIndex === rowIndex;
    };

    const isColHighlighted = (colIndex) => {
        return selectedCell && selectedCell.colIndex === colIndex;
    };

    return (
        <div className="grid">
            {puzzle.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, columnIndex) => (
                        <input
                            key={columnIndex}
                            className={`cell 
                                ${isSelected(rowIndex, columnIndex) ? 'selected' : ''} 
                                ${isRowHighlighted(rowIndex) ? 'selected-row' : ''} 
                                ${isColHighlighted(columnIndex) ? 'selected-col' : ''}`}
                            value={cell !== 0 ? String(cell) : ''}
                            onChange={(e) => handleCellChange(e.target.value, rowIndex, columnIndex)}
                            onFocus={() => clearCell(rowIndex, columnIndex)}
                            onClick={() => handleCellClick(rowIndex, columnIndex)} // Handle click event
                            maxLength="1"
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default SudokuGrid;