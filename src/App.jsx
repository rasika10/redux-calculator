import React from 'react';
import Display from './components/Display';
import Keypad from './components/Keypad';
import './App.css';
import store from './app/store';
import { Provider } from 'react-redux';
const App = () => {
  return (<Provider store={store}>
    <div className="calculator">
      <Display />
      <Keypad />
    </div></Provider>
  );
};

export default App;