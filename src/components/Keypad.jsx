// src/components/Keypad.jsx
import React from 'react';
import Button from './Button';
import { useDispatch } from 'react-redux';
import {
  inputDigit,
  clear,
  inputOperator,
  calculate,
  inputDecimal,
  toggleSign,
  inputPercent,
} from '../features/calculator/calculatorSlice';

const Keypad = () => {
  const dispatch = useDispatch();

  const handleClick = (type, value) => {
    switch (type) {
      case 'digit':
        dispatch(inputDigit(value));
        break;
      case 'operator':
        dispatch(inputOperator(value));
        break;
      case 'equal':
        dispatch(calculate());
        break;
      case 'clear':
        dispatch(clear());
        break;
      case 'decimal':
        dispatch(inputDecimal());
        break;
      case 'sign':
        dispatch(toggleSign());
        break;
      case 'percent':
        dispatch(inputPercent());
        break;
      default:
        break;
    }
  };

  const buttons = [
    { label: 'AC', type: 'clear' },
    { label: '+/−', type: 'sign' },
    { label: '%', type: 'percent' },
    { label: '÷', type: 'operator', value: '/' },
    { label: '7', type: 'digit' },
    { label: '8', type: 'digit' },
    { label: '9', type: 'digit' },
    { label: '×', type: 'operator', value: '*' },
    { label: '4', type: 'digit' },
    { label: '5', type: 'digit' },
    { label: '6', type: 'digit' },
    { label: '-', type: 'operator', value: '-' },
    { label: '1', type: 'digit' },
    { label: '2', type: 'digit' },
    { label: '3', type: 'digit' },
    { label: '+', type: 'operator', value: '+' },
    { label: '0', type: 'digit', className: 'zero' },
    { label: '.', type: 'decimal' },
    { label: '=', type: 'equal' },
  ];

  return (
    <div className="keypad">
      {buttons.map((btn, i) => (
        <Button
          key={i}
          label={btn.label}
          onClick={() => handleClick(btn.type, btn.value || btn.label)}
          className={btn.className}
        />
      ))}
    </div>
  );
};

export default Keypad;
