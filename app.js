const operatorBttns = document.querySelectorAll('[data-operator]')
const numberBttns = document.querySelectorAll('[data-number]')
const acBttn = document.getElementById("ac");
const cBttn = document.getElementById("c");
const on = document.getElementById("on");
const equals = document.getElementById("equals")
const decimal = document.getElementById("decimal");
const lastOperationScreen = document.getElementById('lastOperationScreen')
const currentOperationScreen = document.getElementById('currentOperationScreen')

let isOn = true;
let currentNumber = '';
let nextNumber = '';
let currentOperation = null;
let shouldResetScreen = false;

acBttn.addEventListener('click', () => {
  currentOperationScreen.textContent = '0'
  lastOperationScreen.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
});

cBttn.addEventListener('click', () => {
    currentOperationScreen.textContent = currentOperationScreen.textContent.slice(0, -1);
    if (currentOperationScreen.textContent === '') {
        currentOperationScreen.textContent = '0';
    }
    currentNumber =  currentOperationScreen.textContent;
})

percent.addEventListener('click', () => {
    if (currentOperationScreen.textContent !== '0') {
        let result = Number((currentOperationScreen.textContent / 100).toFixed(14));
        currentOperationScreen.textContent = result < 5e-15 ? '0' : result;
    }
})

on.addEventListener('click', () => {
    if (isOn) {
        currentOperationScreen.textContent = '';
        isOn = false;
    } else {
        currentOperationScreen.textContent = '0';
        currentNumber = '';
        nextNumber = '';
        isOn = true;
    }
})

numberBttns.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorBttns.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
    if (currentOperationScreen.textContent === '0' || shouldResetScreen)
    resetScreen()

    if(currentOperationScreen.textContent === '0') {
        currentOperationScreen.textContent = number;
    } else {
        currentOperationScreen.textContent += number;
    }
    currentNumber = currentOperationScreen.textContent;
}

function resetScreen() {
    currentOperationScreen.textContent = ''
    shouldResetScreen = false
  }

decimal.addEventListener('click', () => {
    if(!currentOperationScreen.textContent.includes('.')) {
        currentOperationScreen.textContent += '.';
        currentNumber = currentOperationScreen.textContent;
    } else if(currentOperation !== null && !currentOperationScreen.textContent.includes('.')) {
        nextNumber = currentOperationScreen.textContent;
    }

});

function setOperation(operator) {
  if (currentOperation !== null) evaluate()
  firstOperand = currentOperationScreen.textContent
  currentOperation = operator
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
  shouldResetScreen = true
}


  function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
      case '+':
        return a + b
      case '-':
        return a - b
      case 'x':
        return a * b
      case '/':
        if (b === 0) return null
        else return a / b
      default:
        return null
    }
  }

  equals.addEventListener('click', evaluate)

  function evaluate() {
    if (currentOperation === null || shouldResetScreen) return
    if (currentOperation === '/' && currentOperationScreen.textContent === '0') {
      alert("You can't divide by 0!")
      return
    }
    secondOperand = currentOperationScreen.textContent
    currentOperationScreen.textContent = roundResult(
      operate(currentOperation, firstOperand, secondOperand)
    )
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
  }

  function roundResult(number) {
    return Math.round(number * 1000) / 1000
  }