// Variables to store calc state
let currentInput = '0';
let previousInput = '0';
let currentOperation = null;
let shouldResetDisplay = false;
let calculationExpression = '0';

// DOM Elments
const display = document.querySelector('.display');
const calculationDisplay = document.querySelector('.calculation-display');

// Function tot update the display
function updateDisplay() {
    display.value = currentInput;
    calculationDisplay.textContent = calculationExpression;
}

// Function to append a number to the display
function appendToDisplay(number) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

// Function to clear the display
function clearDisplay() {
    currentInput = '0';
    previousInput = '0';
    currentOperation = null;
    calculationExpression = '0';
    updateDisplay();
}

// Function to delete the last character
function deleteLastChar() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

// Function to handle operations
function calculate(operation) {
    if (currentOperation !== null) calculateResult();
    
    previousInput = currentInput;
    
    // Update the calculation expression
    let operationSymbol = '';
    switch(operation) {
        case 'add': operationSymbol = ' + '; break;
        case 'subtract': operationSymbol = ' - '; break;
        case 'multiply': operationSymbol = ' × '; break;
        case 'divide': operationSymbol = ' ÷ '; break;
    }
    
    calculationExpression = previousInput + operationSymbol;
    currentOperation = operation;
    shouldResetDisplay = true;
    updateDisplay();
}

// Function to calculate the result
function calculateResult() {
    if (currentOperation === null) return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    
    // Update calculate show complete calculation
    calculationExpression += currentInput + ' = ';
    
    switch (currentOperation) {
        case 'add':
            result = prev + current;
            break;
        case 'subtract':
            result = prev - current;
            break;
        case 'multiply':
            result = prev * current;
            break;
        case 'divide':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    currentOperation = null;
    updateDisplay();
}