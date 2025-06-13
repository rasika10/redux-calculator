import calculatorReducer, {
  inputDigit,
  clear,
  inputOperator,
  calculate,
} from '../features/calculator/calculatorSlice';

describe('calculator reducer', () => {
  it('should handle initial state', () => {
    expect(calculatorReducer(undefined, {})).toEqual({
      currentValue: '0',
      previousValue: null,
      operator: null,
      overwrite: false,
      error: null,
    });
  });

  it('should handle inputDigit', () => {
    const state = calculatorReducer(undefined, inputDigit('5'));
    expect(state.currentValue).toBe('5');
  });

  it('should handle inputOperator', () => {
    const state = calculatorReducer(
      { currentValue: '5', previousValue: null, operator: null, overwrite: false, error: null },
      inputOperator('x')
    );
    expect(state.operator).toBe('x');
    expect(state.previousValue).toBe('5');
  });

  it('should handle calculate', () => {
    let state = calculatorReducer(undefined, inputDigit('5'));
    state = calculatorReducer(state, inputOperator('x'));
    state = calculatorReducer(state, inputDigit('2'));
    state = calculatorReducer(state, calculate());
    expect(state.currentValue).toBe('10');
  });

  it('should handle clear', () => {
    const state = calculatorReducer(
      { currentValue: '10', previousValue: '5', operator: '+', overwrite: true, error: null },
      clear()
    );
    expect(state.currentValue).toBe('0');
    expect(state.operator).toBe(null);
    expect(state.previousValue).toBe(null);
    expect(state.error).toBe(null);
    expect(state.overwrite).toBe(false);
  });
});
