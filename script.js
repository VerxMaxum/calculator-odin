const displayableButtons = document.querySelectorAll('.displayable');
let displayText = "";

displayableButtons.forEach(button => {
    button.addEventListener('click', display);
});

const equals = document.querySelector('#result');
equals.addEventListener('click', operate);

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clear);

const backspace = document.querySelector('#backspace');
backspace.addEventListener('click', removeEnd);

function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n1 / n2;
}

function getFirstNumber(displayText) {
    const length = displayText.length;
    let operatorIndex = 0;
    for(let i = 1; i < displayText.length; i++) {
        let character = displayText.charAt(i);
        if(character === '+' || character === '-' || character === `\u{00F7}` || character === `\u{00D7}`){
            operatorIndex = i;
            break;
        }
    }
    console.log('Inside getFirstNumber' + displayText.substring(0, operatorIndex) + ' operator index: ' + operatorIndex);

    return displayText.slice(0, operatorIndex);
}

function getOperator(displayText) {
    let operator = "";
    for(let i = 1; i < displayText.length; i++) {
        if(displayText.charAt(i) === '+' || displayText.charAt(i) === '-'
        || displayText.charAt(i) === `\u{00F7}` || displayText.charAt(i) === `\u{00D7}`) {
            operator = displayText.charAt(i);
            break;
        }
    }
    return operator;
}

function previousOperator(displayText) {
    let hasPreviousOperator = false;
    for(let i = 1; i < displayText.length; i++) {
        if(displayText.charAt(i) === '+' || displayText.charAt(i) === '-'
        || displayText.charAt(i) === `\u{00F7}` || displayText.charAt(i) === `\u{00D7}`) {
            hasPreviousOperator = true;
            break;
        }
    }
    return hasPreviousOperator;
}

function getSecondNumber(displayText) {
    for(let i = 1; i < displayText.length; i++) {
        let character = displayText.charAt(i);
        if(character === '+' || character === '-' || character === `\u{00F7}` || character === `\u{00D7}`){
            operatorIndex = i;
            break;
        }
    }
    return displayText.substring(operatorIndex+1);
}

function isOperator(text) {
    return text === '+' || text === '-' || text === `\u{00F7}` || text === `\u{00D7}`;
}

function isDot(text) {
    return text === '.';
}

function clear() {
    displayText = "";
    document.getElementById('display-text').textContent = displayText;
}

function removeEnd() {
    displayText = displayText.slice(0, displayText.length-1);
    document.getElementById('display-text').textContent = displayText;
}

function display(event) {
    const button = event.target;
    const buttonText = button.textContent;
    let length = displayText.length;

    if(length === 0 && (buttonText === '+' || buttonText === `\u{00F7}` || buttonText === `\u{00D7}`)) {
        return;
    }
    if((isOperator(buttonText) || isDot(buttonText)) && 
       (isOperator(displayText[displayText.length-1]) || isDot(displayText[displayText.length-1]))) {
        return;
    }
    if((isOperator(buttonText) || isDot(buttonText)) && previousOperator(displayText)) {
        operate();
    }
    displayText += buttonText;
    if(length > 15) {
        displayText = "";
    }
    document.getElementById('display-text').textContent = displayText;
    
}
// solve for minus sign as first symbol and display before operator
function operate() {
    let firstNum = parseFloat(getFirstNumber(displayText));
    let operator = getOperator(displayText);
    let secondNum = parseFloat(getSecondNumber(displayText));
    let result = 0;

    console.log(firstNum + ' ' + secondNum);

    if(operator === '+') {
        result = add(firstNum, secondNum);
        console.log(result);
    }
    else if(operator === '-') {
        result =  subtract(firstNum, secondNum);
    }
    else if(operator === `\u{00F7}`) {
        result = divide(firstNum, secondNum);
    }
    else if(operator === `\u{00D7}`) {
        result = multiply(firstNum, secondNum);
    }

    displayText = result.toString();
    if(displayText.length > 10) {
        displayText = displayText.substring(0,11);
    }
    console.log("result = " + result);
    document.getElementById('display-text').textContent = displayText;
}