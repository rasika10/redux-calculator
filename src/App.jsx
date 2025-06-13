import React from 'react';
import Display from './components/Display';
import Keypad from './components/Keypad';
import './App.css';

const App = () => {
  return (
    <div className="calculator">
      <Display />
      <Keypad />
    </div>
  );
};

export default App;