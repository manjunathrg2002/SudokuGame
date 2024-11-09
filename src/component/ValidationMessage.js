// src/components/ValidationMessage.js
import React from 'react';

const ValidationMessage = ({ validationResult }) => {
    return (
        validationResult && (
            <p className={validationResult === 'Correct' ? 'correctText' : 'incorrectText'} >
                {validationResult}
            </p>
        )
    );
};

export default ValidationMessage;