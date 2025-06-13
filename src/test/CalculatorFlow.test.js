// src/test/CalculatorFlow.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('performs addition correctly', () => {
  render(<App />);

  // Simulate user clicking "2 + 3 ="
  fireEvent.click(screen.getByText('5'));
  fireEvent.click(screen.getByText('*'));
  fireEvent.click(screen.getByText('2'));
  fireEvent.click(screen.getByText('='));

  // Verify the display shows "5"
  expect(screen.getByTestId('display')).toHaveTextContent('10');
});
