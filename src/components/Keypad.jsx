import React, {useEffect} from 'react';
import Button from './Button';
import { useDispatch } from 'react-redux';
import {
  inputDigit,
  clear,
  inputOperator,
  calculate,
  inputDecimal,
  toggleSign,
} from '../features/calculator/calculatorSlice';

const Keypad = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      if (/^[0-9]$/.test(key)) {
        dispatch(inputDigit(key));
      } else if (['+', '-', 'x', '/', '%'].includes(key)) {
        dispatch(inputOperator(key));
      } else if (key === '.' || key === ',') {
        dispatch(inputDecimal());
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        dispatch(calculate());
      } else if (key === 'Escape') {
        dispatch(clear());
      } else if (key === 'Backspace') {
        dispatch(clear());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);
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

      default:
        break;
    }
  };

  const buttons = [
    { label: 'AC', type: 'clear', className:'clear' },
    { label: '+/−', type: 'sign', className:'sign' },
    { label: '%', type: 'operator', value:'%', className: 'operator'},
    { label: '÷', type: 'operator', value: '/', className: 'operator' },
    { label: '7', type: 'digit' },
    { label: '8', type: 'digit' },
    { label: '9', type: 'digit' },
    { label: 'x', type: 'operator', value: 'x', className: 'operator' },
    { label: '4', type: 'digit' },
    { label: '5', type: 'digit' },
    { label: '6', type: 'digit' },
    { label: '-', type: 'operator', value: '-' , className: 'operator'},
    { label: '1', type: 'digit' },
    { label: '2', type: 'digit' },
    { label: '3', type: 'digit' },
    { label: '+', type: 'operator', value: '+' , className: 'operator'},
    { label: '0', type: 'digit', className: 'zero' },
    { label: '.', type: 'decimal' },
    { label: '=', type: 'equal', className: 'operator' },
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
