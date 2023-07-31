const displayableButtons = document.querySelectorAll('.displayable');
let displayText = "";

displayableButtons.forEach(button => {
    button.addEventListener('click', display);
});

const equals = document.querySelector('#result');
equals.addEventListener('click', operate);

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clear);

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
    const numbers = displayText.split(getOperator(displayText));

    return numbers[0];
}

function getOperator(displayText) {
    let operator = "";
    for(let character of displayText) {
        if(character === '+' || character === '-' || character === `\u{00F7}` || character === `\u{00D7}`) {
            operator = character;
            break;
        }
    }
    return operator;
}

function previousOperator(displayText) {
    let hasPreviousOperator = false;
    for(let i = 0; i < displayText.length; i++) {
        if(displayText.charAt(i) === '+' || displayText.charAt(i) === '-' || displayText.charAt(i) === `\u{00F7}` || displayText.charAt(i) === `\u{00D7}`) {
            hasPreviousOperator = true;
            break;
        }
    }
    return hasPreviousOperator;
}

function getSecondNumber(displayText) {
    const numbers = displayText.split(`${getOperator(displayText)}`);
    console.table(numbers);
    return numbers[1];
}

function isOperatorOrDot(text) {
    return text === '+' || text === '-' || text === `\u{00F7}` || text === `\u{00D7}` || text === '.';
}

function display(event) {
    const button = event.target;
    const buttonText = button.textContent;
    
    if(isOperatorOrDot(buttonText) && isOperatorOrDot(displayText[displayText.length-1])) {
        return;
    }
    if(isOperatorOrDot(buttonText) && previousOperator(displayText)) {
        operate();
    }
    displayText += buttonText;
    document.getElementById('display-text').textContent = displayText;
}

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
    if(displayText.length > 15) {
        displayText = displayText.substring(0,15);
    }
    console.log("result = " + result);
    document.getElementById('display-text').textContent = displayText;
}

function clear() {
    displayText = "";
    document.getElementById('display-text').textContent = displayText;
}