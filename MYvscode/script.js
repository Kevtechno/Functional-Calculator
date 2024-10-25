let runningTotal= 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            isResultDisplayed = false;
            break;
        case '=':
        case 'Enter':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            isResultDisplayed = true;
            break;
        case '←':
        case 'Backspace':
            if (isResultDisplayed) {
                buffer = '0';
                isResultDisplayed = false;
            } else if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.slice(0, -1); 
                if (buffer === '') { 
                    buffer = '0';
                }
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
       return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
    isResultDisplayed = false;
}

function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '−'){
        runningTotal -= intBuffer;
    }else if(previousOperator === '×'){
        runningTotal *= intBuffer;
    }else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer === "0" || isResultDisplayed){
        buffer = numberString;
        isResultDisplayed = false;
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-button').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 200);
    });
}

document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (!isNaN(key) && key.length === 1) {
        buttonClick(key);
    } else {
        switch (key) {
            case '+':
                handleSymbol('+');
                break;
            case '-':
                handleSymbol('−');
                break;
            case '*':
                handleSymbol('×');
                break;
            case '/':
                handleSymbol('÷');
                break;
            case 'Enter':
            case '=':
                handleSymbol('=');
                break;
            case 'Backspace':
            case 'ArrowLeft':
                handleSymbol('←');
                break;
            case 'Escape':
            case 'c':
                handleSymbol('C');
                break;
        }
    }
    screen.innerText = buffer;
});


init();