import * as matchForm from './matchForm.js';

const resultExpression = document.getElementById("resultExpression");

function btnClick(num) {
    if (resultExpression) {
    resultExpression.value = resultExpression.value + num;
    }
}

clear.onclick = function(event) {
    if (resultExpression) {
    resultExpression.value = '';
    }
}

zero.onclick = function(event) {
    btnClick(0);
}

one.onclick = function(event) {
    btnClick(1);
}

two.onclick = function(event) {
    btnClick(2);
}

three.onclick = function(event) {
    btnClick(3);
}

four.onclick = function(event) {
    btnClick(4);
}

five.onclick = function(event) {
    btnClick(5);
}

six.onclick = function(event) {
    btnClick(6);
}

seven.onclick = function(event) {
    btnClick(7);
}

eight.onclick = function(event) {
    btnClick(8);
}

nine.onclick = function(event) {
    btnClick(9);
}

point.onclick = function(event) {
    if (matchForm.check(resultExpression.value)) {
        del.onclick();
        btnClick(`.`);
    } else {
        btnClick(`.`);
    }
}

sumNumber.onclick = function(event) {
    if (matchForm.check(resultExpression.value)) {
        del.onclick();
        btnClick(`+`);
    } else {
        btnClick(`+`);
    }
}

subNumber.onclick = function(event) {
    if (matchForm.check(resultExpression.value)) {
        del.onclick();
        btnClick(`-`);
    } else {
        btnClick(`-`);
    }
}

division.onclick = function(event) {
    if (matchForm.check(resultExpression.value)) {
        del.onclick();
        btnClick(`/`);
    } else {
        btnClick(`/`);
    }
}

multiplication.onclick = function(event) {
    if (matchForm.check(resultExpression.value)) {
        del.onclick();
        btnClick(`*`);
    } else {
        btnClick(`*`);
    }
}

getPercent.onclick = function(event) {
    if (matchForm.check(resultExpression.value)) {
        del.onclick();
        btnClick(`%`);
    } else {
        btnClick(`%`);
    }
}

del.onclick = function(event) {
    if (resultExpression) {
    resultExpression.value = resultExpression.value.slice(0, -1);
    }
}

document.getElementById("resultExpression").addEventListener("keydown", function(event) {
  if (event.code === "NumpadEnter") {
    getResult.onclick();
   }
});

getResult.onclick = function(event) {
    if (resultExpression) {
    resultExpression.value = String(matchForm.calculateExpression(resultExpression.value));
    }
 }