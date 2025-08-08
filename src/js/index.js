import * as matchForm from './matchForm.js';

const resultExpression = document.getElementById('resultExpression');
const panelButtons = document.querySelector('.panelButtons');

let lastOperator = null;
let lastOperand = null;
let justCalculated = false;

resultExpression.addEventListener('input', () => {
    if (justCalculated) {
        lastOperator = null;
        lastOperand = null;
        justCalculated = false;
    }

    resultExpression.value = resultExpression.value.replace(/[^0-9.+*\/%\-]/g, '');

    const parts = resultExpression.value.split(/([+\-*/%])/);

    for (let i = 0; i < parts.length; i++) {
        if (/[+\-*/%]/.test(parts[i])) continue;

        const firstDot = parts[i].indexOf('.');
        if (firstDot !== -1) {
            parts[i] = parts[i].slice(0, firstDot + 1) + parts[i].slice(firstDot + 1).replace(/\./g, '');
        }
    }

    for (let i = 1; i < parts.length; i++) {
        if (/[+\-*/%]/.test(parts[i]) && /[+\-*/%]/.test(parts[i - 1])) {
            parts.splice(i, 1);
            i--;
        }
    }

    resultExpression.value = parts.join('');
});

panelButtons.addEventListener('click', (e) => {
    e.preventDefault();
    const btn = e.target.closest('button');
    if (!btn) return;

    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (value) {
        handleValue(value);
    } else if (action) {
        handleAction(action);
    }
});

function handleValue(value) {
    const isOperator = /[+\-*/%]/.test(value);

    if (value === '.') {
        const currentNumber = resultExpression.value.split(/[+\-*/%]/).pop();
        if (currentNumber.includes('.')) {
            return;
        }
    }

    if (isOperator && matchForm.check(resultExpression.value)) {
        handleAction('backspace');
    }

    resultExpression.value += value;
    justCalculated = false;
}

function handleAction(action) {
    switch (action) {
        case 'c':
            resultExpression.value = '';
            lastOperator = null;
            lastOperand = null;
            justCalculated = false;
            break;

        case 'backspace':
            resultExpression.value = resultExpression.value.slice(0, -1);
            justCalculated = false;
            break;

        case '=':
            if (!resultExpression.value) return;

            if (justCalculated && lastOperator && lastOperand !== null) {
                resultExpression.value = String(
                    matchForm.calculateExpression(
                        resultExpression.value + lastOperator + lastOperand
                    )
                );
            } else {
                const match = resultExpression.value.match(/([+\-*/%])(\d+(\.\d+)?)$/);
                if (match) {
                    lastOperator = match[1];
                    lastOperand = match[2];
                } else {
                    lastOperator = null;
                    lastOperand = null;
                }

                resultExpression.value = String(
                    matchForm.calculateExpression(resultExpression.value)
                );

                justCalculated = true;
            }
            break;
    }
}

resultExpression.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        e.preventDefault();
        handleAction('=');
    }
});
