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
    //console.log(exprWithoutSpace);

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
    //console.log('Count brackets: ', leftBracketCount, rightBracketCount);
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

    let operatorsSubstring = [];
    let numbersSubstring = [];

    for (let i = 0; i < operators.length; ) {
        if(operators.includes('(')) {
            let leftBracketInExpr = '';
            let rightBracketInExpr = '';
            let leftBracketInOperators = ''
            let rightBracketInOperators = '';
            if(leftBracketCount === 1) {
                leftBracketInExpr = exprWithoutSpace.lastIndexOf('(');
                rightBracketInExpr = exprWithoutSpace.indexOf(')');
                leftBracketInOperators = operators.lastIndexOf('(');
                rightBracketInOperators = operators.indexOf(')');
            } else {
                //console.log(operators);
                let arrayOper = [];
                let arrayIndex = [];
                operators.forEach(function(item, index){
                    if(item == '(' || item == ')') {
                        if(arrayOper.includes(')') === false){
                            arrayOper.push(item);
                            arrayIndex.push(index);
                        }
                    }
                });
                let arrayExprOper = [];
                let arrayExprIndex = [];
                for(let i = 0; i < exprWithoutSpace.length; i++) {
                    if(exprWithoutSpace[i] == '(' || exprWithoutSpace[i] == ')'){
                        if(arrayExprOper.includes(')') === false){
                            arrayExprOper.push(exprWithoutSpace[i]);
                            arrayExprIndex.push(i);
                        }
                    }
                }
                //console.log(arrayIndex, arrayOper);
                //console.log(arrayExprIndex, arrayExprOper);
                leftBracketInOperators = arrayIndex[arrayIndex.length - 2];
                rightBracketInOperators = arrayIndex[arrayIndex.length - 1];
                leftBracketInExpr = arrayExprIndex[arrayIndex.length - 2];
                rightBracketInExpr = arrayExprIndex[arrayIndex.length - 1];
            }

            //create substringExpr
            let substringExpr = exprWithoutSpace.substring(leftBracketInExpr + 1, rightBracketInExpr);
            let deleteSubstring = exprWithoutSpace.substring(leftBracketInExpr, rightBracketInExpr + 1);
            //console.log(substringExpr);

            //create array with numbers in substringExpr
            let numbersStringSubstring = substringExpr.replace(/[*\/+\-()]/g, ',');
            //console.log(-numbersSubstring[0] + '');
            //console.log(numbersStringSubstring);
            let numbersArraySubstring = numbersStringSubstring.split(',');
            if(numbersSubstring[0] < 0) {
                let zamena = numbersArraySubstring.indexOf(-numbersSubstring[0] + '');
                numbersArraySubstring[zamena] = numbersSubstring[0] + '';
            }
            //console.log(numbersArraySubstring);
            numbersSubstring = numbersArraySubstring.filter(item => item !== '');
            //console.log(numbersSubstring);

            //create array with operators in substringExpr
            let operatorsStringSubstring = substringExpr.replace(/[0-9]/g, '');
            let operatorsArraySubstring = operatorsStringSubstring.split('');
            operatorsSubstring = operatorsArraySubstring.filter(item => item !== '');
            //console.log(operatorsSubstring);
            
            let positionFirstSub = numbers.indexOf(numbersSubstring[0]);
            let positionLastSub = numbers.indexOf(numbersSubstring[numbersSubstring.length - 1]);


            
            

            for(let j = 0; j < operatorsSubstring.length; ){
                if(operatorsSubstring.includes('*') && operatorsSubstring.includes('/')) {
                    let indexMulti = operatorsSubstring.indexOf('*');
                    let indexDiv = operatorsSubstring.indexOf('/');
                    //console.log(indexMulti, indexDiv);
                    if(indexMulti > indexDiv) {
                        let operatorType = '/';
                        operatorSubstringFunc(operatorType);

                        j = 0;
                    } else {
                        let operatorType = '*';
                        operatorSubstringFunc(operatorType);
                        j = 0;
                    }
                } else if(operatorsSubstring.includes('*')) {
                    let operatorType = '*';
                    operatorSubstringFunc(operatorType);
                    j = 0;
                } else if(operatorsSubstring.includes('/')) {
                    let operatorType = '/';
                    operatorSubstringFunc(operatorType);
                    j = 0;
                } else if(operatorsSubstring.includes('+') && operatorsSubstring.includes('-')) {
                    let indexPlus = operatorsSubstring.indexOf('+');
                    let indexMinus = operatorsSubstring.indexOf('-');
                    if(indexPlus > indexMinus) {
                        let operatorType = '-';
                        operatorSubstringFunc(operatorType);
                        j = 0;
                    } else {
                        let operatorType = '+';
                        operatorSubstringFunc(operatorType);
                        j = 0;
                    }
                } else if(operatorsSubstring.includes('+')) {
                    let operatorType = '+';
                    operatorSubstringFunc(operatorType);
                    j = 0;
                } else if(operatorsSubstring.includes('-')) {
                    let operatorType = '-';
                    operatorSubstringFunc(operatorType);
                    j = 0;
                } else {
                    j = j + 1;
                }
               //console.log(numbersSubstring);
            }

            //console.log(numbersSubstring[0]);

            //console.log(numbers);
            //console.log(numbersSubstring);
            //console.log(positionFirstSub);
            //console.log(positionLastSub);
            //console.log(positionLastSub - positionFirstSub)
            let sum = positionLastSub - positionFirstSub + 1;
            //console.log(sum);

            numbers.splice(positionFirstSub, sum, numbersSubstring[0]);
            //console.log(numbers);

            exprWithoutSpace = exprWithoutSpace.replace(deleteSubstring, numbersSubstring[0]);
            //console.log(exprWithoutSpace);

            //console.log(exprWithoutSpace.replace(deleteSubstring, numbersSubstring[0]));
            let res = rightBracketInOperators - leftBracketInOperators;
            operators.splice(leftBracketInOperators, res + 1);
            //console.log(operators);
            //leftBracketCount = leftBracketCount - 1;
            i = 0 ;
           
        }else if(operators.includes('*') && operators.includes('/')) {
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
            //console.log(numbers);
            let operatorType = '*';
            operator(operatorType);
            i = 0;
        } else if(operators.includes('/')) {
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
        } else if(operators.includes('+')) {
            let operatorType = '+';
            operator(operatorType);
            i = 0;
        } else if(operators.includes('-')) {
            let operatorType = '-';
            operator(operatorType);
            i = 0;
        } else {
            i = i + 1;
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

    function operatorSubstringFunc(a) {
        let index = operatorsSubstring.indexOf(a);
        let res = '';
        if(a == '-') { res = +numbersSubstring[index] - +numbersSubstring[index + 1] };
        if(a == '+') { res = +numbersSubstring[index] + +numbersSubstring[index + 1] };
        if(a == '*') { res = +numbersSubstring[index] * +numbersSubstring[index + 1] };
        if(a == '/') {
            if(+numbersSubstring[index + 1] === 0) {
                throw new Error("TypeError: Division by zero.");
            } else {
                res = +numbersSubstring[index] / +numbersSubstring[index + 1];
            } 
        };
        numbersSubstring.splice(index, 2, +res);
        operatorsSubstring.splice(index, 1);
    };
    /* console.log('Numbers: ', numbers);
    console.log('Operators: ', operators); */
    return numbers[0];
}

module.exports = {
    expressionCalculator
}