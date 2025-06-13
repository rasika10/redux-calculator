import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import calculatorReducer from '../features/calculator/calculatorSlice';

function renderWithProviders(ui, { preloadedState = {}, store = configureStore({
  reducer: { calculator: calculatorReducer },
  preloadedState,
}), ...renderOptions } = {}) {
  return render(
    <Provider store={store}>
      {ui}
    </Provider>,
    renderOptions
  );
}

export * from '@testing-library/react';
export { renderWithProviders as render };