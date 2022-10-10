// A simple arithmatic expression will look as :
// 15 + 20
// 15 will be the first operand
// + will be the operator
// 20 will be the 2nd operand
// We must be able to store and track these basics
// Create a object literal to initialize these values
const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

// LABEL 0: Read the next function only when you reach LABEL 0
function inputDigit(digit) {
  // LABEL 6 update to input 2nd digit
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    // Overwrite `displayValue` if the current value is '0' otherwise append to it
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }

  // for debugging
  console.log(calculator);
}

// LABEL 2:
function inputDecimal(dot) {
  // LABEL 12
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }

  // execute only if there is no existing decimal point
  if (!calculator.displayValue.includes(dot)) {
    // append decimal point to the string
    calculator.displayValue += dot;
  }
}

// LABEL 4:
function handleOperator(nextOperator) {
  // unpack the calculator object literal
  const { firstOperand, displayValue, operator } = calculator;

  // convert the string value to floating point
  const inputValue = parseFloat(displayValue);
  console.log(`HERE ${inputValue}`);

  //LABEL 9:
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  // if firstOperand is null and input is valid update the key:value pair
  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    // LABEL 8
    console.log(`inside computations`);
    const result = calculate(firstOperand, inputValue, operator);
    console.log(`result is ${result}`);

    //LABEL 13: fix floating point precision
    // calculator.displayValue = String(result);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;

  //for debugging
  console.log(calculator);
}

// LABEL 7:
function calculate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
      break;
    case "-":
      return firstOperand - secondOperand;
      break;
    case "*":
      return firstOperand * secondOperand;
      break;
    case "/":
      return firstOperand / secondOperand;
      break;

    default:
      console.log("incorrect operator !!");
      break;
  }
  return secondOperand;
  // GOTO LABEL 8
}

// Update the display area of the calculator
function updateDisplay() {
  console.log(`INSIDE UPDATE DISPLAY ()`);
  console.log(`current display value is ${calculator.displayValue}`);
  // select html element for display and store it in a variable
  const display = document.querySelector(".calculator-screen");
  //   Set the value of this element with value stored in calculator.displayValue
  display.value = calculator.displayValue;
}

// call the function to check
//updateDisplay();

// Handling event: Button clicks
// 9 digits, 5 operators (+ - * / =), one decimal and one All Clear buttn
// Algo: grab the html elements and associate it with method .addEventListner('eventName', callBk Function)

// grabbing all keys and store it in a variable
const keys = document.querySelector(".calculator-keys");

keys.addEventListener("click", (e) => {
  const { target } = e;
  const { value } = target;
  if (!target.matches("button")) {
    return;
  }

  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(value);
      break;
    case ".":
      inputDecimal(value);
      break;
    case "all-clear":
      resetCalculator();
      break;
    default:
      // check if the key is an integer
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});
// test above code in browser console before proceeding

// LABEL 0: Allow users to input digits and update calc display accordingly
// LABEL 1: replace console.log("digit", target.value) with
// inputDigit(target.value);
// updateDisplay();

// Input for decimal point
// add decimal point to screen if there is none;
// if there is already a decimal point, ignore it
// LABEL 2: input of decimal point
// LABEL 3: replace the lines of code in event listener callback function

//Handling operators

// use case: user clicks a operator after input of first operand
// in object literal key: firstOperand store first oprand
// in obj literal key: operator: store the operator
// LABEL 4: see
// LABEL 5: see
// LABEL 6: update input digit function to enter 2nd input digit
// LABEL 7: case 2: if user enters another operator
// LABEL 9: case 3: overwriting an operator if user changes mind
// LABEL 10 : case 4: calculator reset button
function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
  // LABEL 11
}

// LABEL 12: case 5: if you enter decimal point after an operator it gets
// appended to the first operand instead of the second operand

// LABEL 13: case 6: fix floating point precision
