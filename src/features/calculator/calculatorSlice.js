import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentValue: '0',
    previousValue: null,
    operator: null,
    overwrite: false,
    error: null,
};

const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        inputDigit(state, action) {
            const digit = action.payload;

            if (state.overwrite) {
                state.currentValue = digit;
                state.overwrite = false;
                return;
            }

            if (state.currentValue === '0' && digit === '0') return;
            if (state.currentValue === '0' && digit !== '.') {
                state.currentValue = digit;
            } else {
                state.currentValue += digit;
            }
        },

        inputDecimal(state) {
            if (!state.currentValue.includes('.')) {
                state.currentValue += '.';
            }
        },

        inputOperator(state, action) {
            if (state.operator && !state.overwrite) {
                const result = performCalculation(state);
                if (result === 'error') {
                    state.error = 'Cannot divide by 0';
                    return;
                }
                state.currentValue = result.toString();
            }

            state.previousValue = state.currentValue;
            state.operator = action.payload;
            state.overwrite = true;
        },

        calculate(state) {
            if (!state.operator || state.previousValue === null) return;

            const result = performCalculation(state);
            if (result === 'error') {
                state.error = 'Cannot divide by 0';
                return;
            }

            state.currentValue = result.toString();
            state.previousValue = null;
            state.operator = null;
            state.overwrite = true;
            state.error = null;
        },

        clear(state) {
            Object.assign(state, initialState);
        },

        toggleSign(state) {
            state.currentValue = (parseFloat(state.currentValue) * -1).toString();
        },

  
    },
});

function performCalculation(state) {
    const prev = parseFloat(state.previousValue);
    const curr = parseFloat(state.currentValue);

    if (state.operator === '/' && curr === 0) return 'error';

    let result = 0;
    switch (state.operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case 'x':
            result = prev * curr;
            break;
        case '/':
            if (curr === 0) {
                state.error = 'Cannot divide by 0';
                state.currentValue = '0';
                return;
            }
            result = prev / curr;
            break;
        case '%':
            result = prev % curr;
            break;
                    
            default:
            return curr;
    }

    return parseFloat(result.toPrecision(12));
}

export const {
    inputDigit,
    inputDecimal,
    inputOperator,
    calculate,
    clear,
    toggleSign,
    inputPercent,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
