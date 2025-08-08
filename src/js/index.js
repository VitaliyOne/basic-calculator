import * as matchForm from './matchForm.js';

const resultExpression = document.getElementById('resultExpression');
const panelButtons = document.querySelector('.panelButtons');

resultExpression.addEventListener('input', () => {
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
}

function handleAction(action) {
    switch (action) {
        case 'c':
            resultExpression.value = '';
            break;

        case 'backspace':
            resultExpression.value = resultExpression.value.slice(0, -1);
            break;

        case '=':
            try {
                resultExpression.value = String(
                    matchForm.calculateExpression(resultExpression.value)
                );
            } catch {
                resultExpression.value = 'Error';
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
