import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentValue: '0',     // Currently displayed value on the calculator
    previousValue: null,   // Previous value stored when an operator is selected
    operator: null,        // Current selected operator (+, -, x, /, etc.)
    overwrite: false,      // If true, next digit input will overwrite the currentValue
    error: null,           // To store any error messages (e.g., division by zero)
};

// Creating a calculator slice with actions and reducers
const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        // Handles digit inputs (0–9)
        inputDigit(state, action) {
            const digit = action.payload;
            //Overwrite the current value if overwrite is true
            if (state.overwrite) {
                state.currentValue = digit;
                state.overwrite = false;
                return;
            }
             // Prevent multiple leading zeros
            if (state.currentValue === '0' && digit === '0') return;

            // Replace the initial '0' unless it's a decimal
            if (state.currentValue === '0' && digit !== '.') {
                state.currentValue = digit;
            } else {
                state.currentValue += digit; // Append digit to current value
            }
        },

            // Handles decimal point input
        inputDecimal(state) {
            if (!state.currentValue.includes('.')) {
                state.currentValue += '.'; // Append decimal only if not already present
            }
        },

        // Handles operator input (+, -, x, /, %)
        inputOperator(state, action) {
            if (state.operator && !state.overwrite) {
                const result = performCalculation(state);
                if (result === 'error') {
                    state.error = 'Cannot divide by 0';
                    return;
                }
                state.currentValue = result.toString();
            }

            // Store current value as previous and save new operator
            state.previousValue = state.currentValue;
            state.operator = action.payload;
            state.overwrite = true;
        },

        // Executes the calculation when '=' is pressed
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

        // Resets the calculator to initial state
        clear(state) {
            Object.assign(state, initialState);
        },

         // Toggles the sign of the current value
        toggleSign(state) {
            state.currentValue = (parseFloat(state.currentValue) * -1).toString();
        },

  
    },
});

// Helper function to perform arithmetic operations based on selected operator
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
