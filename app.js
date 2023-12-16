const percent = document.getElementById("percent");
const divide = document.getElementById("divide");
const multiply = document.getElementById("multiply");
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const numberBttns = document.querySelectorAll(".numbers");
const acBttn = document.getElementById("ac");
const cBttn = document.getElementById("c");
const on = document.getElementById("on");
const equals = document.getElementById("equals")

let display = document.querySelector(".display");
let isOn = true;
let currentNumber = '';
let nextNumber = '';
let operation = null;

acBttn.addEventListener('click', () => {
    display.textContent = '0';
    currentNumber = '';
    nextNumber = '';

});

cBttn.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === '') {
        display.textContent = '0';
    }
    currentNumber =  display.textContent
})

percent.addEventListener('click', () => {
    if (display.textContent !== '0') {
        display.textContent = Number((display.textContent / 100).toFixed(14));
        display.textContent = result < 5e-15 ? '0' : result;
    }
})

on.addEventListener('click', () => {
    if (isOn) {
        display.textContent = '';
        isOn = false;
    } else {
        display.textContent = '0';
        currentNumber = '';
        nextNumber = '';
        isOn = true;
    }
})


numberBttns.forEach(button => {
    button.addEventListener('click', () => {
        if (display.textContent.length < 15) {
            if (display.textContent === '0') {
                display.textContent = button.textContent;
            } else {
                display.textContent += button.textContent;
            }
        }
        if (!operation) {
            currentNumber += button.textContent;
            display.textContent = currentNumber;
        } else {
            nextNumber += button.textContent;
            display.textContent = nextNumber;
        }
    });
});

divide.addEventListener('click', () => {
    operation = '/';
});

multiply.addEventListener('click', () => {
    operation = '*';
});

minus.addEventListener('click', () => {
    operation = '-';
});

plus.addEventListener('click', () => {
    operation = '+';
})


equals.addEventListener('click', () => {
    let result;
    if (operation === '/') {
        result = Number(currentNumber) / Number(nextNumber);
    } else if (operation === '*') {
        result = Number(currentNumber) * Number(nextNumber);
    } else if (operation === '-') {
        result = Number(currentNumber) - Number(nextNumber);
    } else if (operation === '+') {
        result = Number(currentNumber) + Number(nextNumber);
    }
    
    let resultString = result.toString();

    if (resultString.length > 15) {
        resultString = result.toFixed(10);
        resultString = parseFloat(resultString).toString();
    }

    display.textContent = result;

    currentNumber = display.textContent;
    nextNumber = '';
    operation = null;
});






