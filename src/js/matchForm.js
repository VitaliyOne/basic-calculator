export function sum (summandOne, summandTwo) {
    return summandOne + summandTwo;
}

export function subtract(minuend, subtrahend) {
    return minuend - subtrahend;
}

export function multiplication(multiplicanda, multiplier){
    return multiplicanda * multiplier;
}

export function division(dividend, divisor) {
    return dividend / divisor;
}

export function getPercent(number) {
    return number/100;
}

export function check(str) {
    const strLS = str.slice(-1);
    if (strLS === '+' || strLS === '-' || strLS === '/' || strLS === '*' || strLS === '.' || strLS === '%') {
        return true;
    } else {
        return false;
    }   
}

export function calculateExpression(expression) {
    const tokens = expression.match(/\d+(\.\d+)?|%|[+\-*/]/g);

    if (!tokens) {
        return 'Ошибка в выражении';
    }

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '%') {
            const prevToken = tokens[i - 1];
            if (!prevToken) {
                return 'Ошибка в выражении';
            }
            const percentValue = parseFloat(prevToken) / 100;
            tokens.splice(i - 1, 2, percentValue);
            i--;
        }
    }

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '*' || tokens[i] === '/') {
            const leftOperand = parseFloat(tokens[i - 1]);
            const rightOperand = parseFloat(tokens[i + 1]);

            if (isNaN(leftOperand) || isNaN(rightOperand)) {
                return 'Ошибка в выражении';
            }

            let result;
            if (tokens[i] === '*') {
                result = leftOperand * rightOperand;
            } else {
                if (rightOperand === 0) {
                    return 'Деление на ноль';
                }
                result = leftOperand / rightOperand;
            }

            tokens.splice(i - 1, 3, result);
            i -= 2;
        }
    }

    let result = parseFloat(tokens[0]);
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token === '+' || token === '-') {
            const operand = parseFloat(tokens[i + 1]);

            if (isNaN(operand)) {
                return 'Ошибка в выражении';
            }

            if (token === '+') {
                result += operand;
            } else {
                result -= operand;
            }
        }
    }
    return Math.round(result*100000)/100000;
}