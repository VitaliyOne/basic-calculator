import * as matchForm from './matchForm.js';

const resultExpression = document.getElementById('resultExpression');
const panelButtons = document.querySelector('.panelButtons');

resultExpression.addEventListener('input', (e) => {
    resultExpression.value = resultExpression.value.replace(/[^0-9.\-+/*%]/g, '');
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
    const isOperator = /[+\-*/%.]/.test(value);

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
