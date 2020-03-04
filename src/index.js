function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let result = 0;
    let exprWithoutSpaceArray = [];
    let exprArray = expr.split('');

    //delete space
    exprArray.forEach(function(item){
        if(item !== ' ') {
            exprWithoutSpaceArray.push(item);
        }
    });

    //string without space
    let exprWithoutSpace = exprWithoutSpaceArray.join('');
    console.log(exprWithoutSpace);

    //count brackets
    let leftBracket = '(';
    let rightBracket = ')';
    let leftBracketCount = 0;
    let rightBracketCount = 0;
    for(let i = 0; i < exprWithoutSpace.length; i++){
        if(exprWithoutSpace[i] === leftBracket) {
            leftBracketCount++;
        } else if(exprWithoutSpace[i] === rightBracket) {
            rightBracketCount++;
        }
    };

    //error brackets
    console.log('Count brackets: ', leftBracketCount, rightBracketCount);
    if(leftBracketCount !== rightBracketCount) {
        throw new Error ('ExpressionError: Brackets must be paired');
    };

    //create array with numbers
    let numbersString = exprWithoutSpace.replace(/[*\/+\-()]/g, ',');
    let numbersArray = numbersString.split(',');
    let numbers = numbersArray.filter(item => item !== '');

    //create array with operators
    let operatorsString = exprWithoutSpace.replace(/[0-9]/g, '');
    let operatorsArray = operatorsString.split('');
    let operators = operatorsArray.filter(item => item !== '');

    if(leftBracketCount == 0 && rightBracketCount == 0) {
        for (let i = 0; i < operators.length; ) {
            if(operators.includes('*') && operators.includes('/')){
                let indexMulti = operators.indexOf('*');
                let indexDiv = operators.indexOf('/');
                if(indexMulti > indexDiv) {
                    let operatorType = '/';
                    operator(operatorType);
                    i = 0;
                } else {
                    let operatorType = '*';
                    operator(operatorType);
                    i = 0;
                }
            } else if(operators.includes('*')) {
                let operatorType = '*';
                operator(operatorType);
                i = 0;
            } else if(operators.includes('/')){
                let operatorType = '/';
                operator(operatorType);
                i = 0;
            } else if(operators.includes('+') && operators.includes('-')) {
                let indexPlus = operators.indexOf('+');
                let indexMinus = operators.indexOf('-');
                if(indexPlus > indexMinus) {
                    let operatorType = '-';
                    operator(operatorType);
                    i = 0;
                } else {
                    let operatorType = '+';
                    operator(operatorType);
                    i = 0;
                }

            } else if(operators.includes('+')){
                let operatorType = '+';
                operator(operatorType);
                i = 0;
            } else if(operators.includes('-')){
                let operatorType = '-';
                operator(operatorType);
                i = 0;
            } else {
                i = i + 1;
            }
        }
    } 

    function operator(a) {
        let index = operators.indexOf(a);
        let res = '';
        if(a == '-') { res = +numbers[index] - +numbers[index + 1] };
        if(a == '+') { res = +numbers[index] + +numbers[index + 1] };
        if(a == '*') { res = +numbers[index] * +numbers[index + 1] };
        if(a == '/') {
            if(+numbers[index + 1] === 0) {
                throw new Error("TypeError: Division by zero.");
            } else {
                res = +numbers[index] / +numbers[index + 1];
            } 
        };
        numbers.splice(index, 2, +res);
        operators.splice(index, 1);
    };
    /* console.log('Numbers: ', numbers);
    console.log('Operators: ', operators); */
    return numbers[0];
}

module.exports = {
    expressionCalculator
}