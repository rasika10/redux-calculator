// src/components/Display.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentValue,
  selectPreviousValue,
  selectOperator,
  selectError
} from '../features/calculator/calculatorSelectors';

const Display = () => {
  const current = useSelector(selectCurrentValue);
  const previous = useSelector(selectPreviousValue);
  const operator = useSelector(selectOperator);
  const error = useSelector(selectError);
  return (
    <div className="display">
      <output aria-label="Expression" className="expression">
        {error ? '' : previous && operator ? `${previous} ${operator}` : ''}
      </output>
      <output aria-label="Result" className="result" data-testid="display">
        {error? 'Cannot divide by 0' : current}
      </output>
    </div>
  );
};

export default Display;
