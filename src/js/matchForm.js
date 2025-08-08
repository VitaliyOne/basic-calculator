export function check(str) {
    return /[+\-*/.%]$/.test(str);
}

export function calculateExpression(expression) {
    const tokens = expression.match(/\d+(\.\d+)?|%|[+\-*/]/g);
    if (!tokens) return 'Error in expression';

    const applyOperation = (arr, ops, callback) => {
        for (let i = 0; i < arr.length; i++) {
            if (ops.includes(arr[i])) {
                const left = parseFloat(arr[i - 1]);
                const right = parseFloat(arr[i + 1]);
                if (isNaN(left) || isNaN(right)) return 'Error in expression';
                const res = callback(arr[i], left, right);
                arr.splice(i - 1, 3, res);
                i -= 2;
            }
        }
        return arr;
    };

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '%') {
            const prev = parseFloat(tokens[i - 1]);
            if (isNaN(prev)) return 'Error in expression';
            tokens.splice(i - 1, 2, prev / 100);
            i--;
        }
    }

    applyOperation(tokens, ['*', '/'], (op, l, r) => {
        if (op === '/' && r === 0) return 'Division by zero';
        return op === '*' ? l * r : l / r;
    });

    applyOperation(tokens, ['+', '-'], (op, l, r) => op === '+' ? l + r : l - r);

    return typeof tokens[0] === 'number' ? Math.round(tokens[0] * 100000) / 100000 : 'Error in expression';
}
