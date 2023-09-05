export function sum (summandOne, summandTwo) {
    return summandOne + summandTwo;
}

export function subtract(minuend, subtrahend) {
    return minuend - subtrahend;
}

export function multiplication(multiplicanda, multiplier){
    return multiplicanda *  multiplier;
}

export function division(dividend, divisor) {
    return dividend / divisor;
}

export function getPercent(number) {
    return number/100;
}

export function check(str) {
    const strLS = str.slice(-1);//последний символ строки
    if (strLS === '+' || strLS === '-' || strLS === '/' || strLS === '*' || strLS === '.' || strLS === '%') {
        return true;
    } else {
        return false;
    }   
}


export function calculateExpression(expression) {
    // Разбиение строки на операнды и операторы
    const tokens = expression.match(/\d+(\.\d+)?|%|[+\-*/]/g);

    // Проверка наличия корректных токенов
    if (!tokens) {
        return 'Ошибка в выражении';
    }

    // Преобразование символа процента в числовое значение
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '%') {
            const prevToken = tokens[i - 1];
            if (!prevToken) {
                return 'Ошибка в выражении';
            }
            const percentValue = parseFloat(prevToken) / 100;
            tokens.splice(i - 1, 2, percentValue);
            i--; // Уменьшение индекса, так как токены были заменены
        }
    }

    // Выполнение операций умножения и деления
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '*' || tokens[i] === '/') {
            const leftOperand = parseFloat(tokens[i - 1]);
            const rightOperand = parseFloat(tokens[i + 1]);

            // Проверка валидности операндов
            if (isNaN(leftOperand) || isNaN(rightOperand)) {
                return 'Ошибка в выражении';
            }

            let result;
            if (tokens[i] === '*') {
                result = leftOperand * rightOperand;
            } else {
                // Проверка деления на ноль
                if (rightOperand === 0) {
                    return 'Деление на ноль';
                }
                result = leftOperand / rightOperand;
            }

            // Замена операндов и оператора на результат операции
            tokens.splice(i - 1, 3, result);
            i -= 2; // Уменьшение индекса, так как токены были заменены
        }
    }

    // Выполнение операций сложения и вычитания
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
