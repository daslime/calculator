// Variables to store calc state
let currentInput = '0';
let previousInput = '0';
let currentOperation = null;
let shouldResetDisplay = false;
let calculationExpression = '0';

// History variables
let calculationHistory = [];
const MAX_HISTORY_ITEMS = 10;

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
    // Check for multiple decimal points
    if (number === '.' && currentInput.includes('.')) {
        alert('You cannot add multiple decimal points!');
        return;
    }
    
    // Check if the input is getting too long
    if (currentInput.length >= 12 && !shouldResetDisplay) {
        alert('Maximum input length reached!');
        return;
    }
    
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
    alert('Calculator has been reset.');
}

// History functions
function addToHistory(historyItem) {
    calculationHistory.unshift(historyItem); // Add to beginning of array
    
    // Limit history size
    if (calculationHistory.length > MAX_HISTORY_ITEMS) {
        calculationHistory.pop(); // Remove oldest item
    }
    
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    
    if (calculationHistory.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'history-empty';
        emptyMessage.textContent = 'No calculations yet';
        historyList.appendChild(emptyMessage);
        return;
    }
    
    calculationHistory.forEach((item, index) => {
        const historyEntry = document.createElement('div');
        historyEntry.className = 'history-entry';
        
        const expressionElement = document.createElement('div');
        expressionElement.className = 'history-expression';
        expressionElement.textContent = item.expression;
        
        const resultElement = document.createElement('div');
        resultElement.className = 'history-result';
        resultElement.textContent = item.result;
        
        historyEntry.appendChild(expressionElement);
        historyEntry.appendChild(resultElement);
        
        // Add click event to reuse the calculation
        historyEntry.addEventListener('click', () => {
            currentInput = item.result;
            calculationExpression = item.result;
            updateDisplay();
        });
        
        historyList.appendChild(historyEntry);
    });
}

function clearHistory() {
    calculationHistory = [];
    updateHistoryDisplay();
    alert('History has been cleared.');
}

function toggleHistory() {
    const historyPanel = document.querySelector('.history-panel');
    historyPanel.classList.toggle('active');
}

// Function to delete the last character
function deleteLastChar() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
        alert('Cleared last digit.');
    }
    updateDisplay();
}

// Function to handle operations
function calculate(operation) {
    if (currentOperation !== null) calculateResult();
    
    // Check if the input is valid for operations
    if (currentInput === '0' && operation === 'divide') {
        alert('Cannot use division with zero as the first operand.');
        return;
    }
    
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
    if (currentOperation === null) {
        alert('Please select an operation first.');
        return;
    }
    
    // Check if user is trying to calculate with default values
    if (previousInput === '0' && currentInput === '0' && currentOperation !== null) {
        alert('Please enter some numbers before calculating.');
        return;
    }
    
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
                alert('Ooops! Cannot divide by zero.');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    // Check if the result is too large or not a valid number
    if (!isFinite(result)) {
        alert('Result is too large or undefined!');
        clearDisplay();
        return;
    }
    
    // Add to history
    const historyItem = {
        expression: calculationExpression,
        result: result.toString()
    };
    addToHistory(historyItem);
    
    currentInput = result.toString();
    currentOperation = null;
    updateDisplay();
}