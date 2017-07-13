var nLast = 0;
var bNewNum = false;
var sLastOpr = "";
var sLastPrompt = "";
var sLastPro = "";

var result = document.getElementById("result"); //计算结果显示
var prompt = document.getElementById("jsqPrompt"); //提示部分
var nums = document.getElementsByClassName("num");//输入数字部分
var simples = document.getElementsByClassName("simple");//输入简单二元运算符号
var complexs = document.getElementsByClassName("complex");//输入复杂一元运算符号
var clear = document.getElementById("clear");//清除计算
var decimal = document.getElementById("decimal");//输入小数点

clear.onclick = function() {
    clearAll();
}
decimal.onclick = function() {
    inputDecimal();
}
for (var i = nums.length - 1; i >= 0; i--) {
    nums[i].onclick = function() {
        inputNum(this.value);
    }
}
for (var i = simples.length - 1; i >= 0; i--) {
    simples[i].onclick = function() {
        operate(this.value);
    }
}
for (var i = complexs.length - 1; i >= 0; i--) {
    complexs[i].onclick = function() {
        operateComplex(this.value);
    }
}


function inputNum(num) { //数字输入方法，数字按钮点击时调用
    if (bNewNum) { //判断是否为新输入的数字
        result.value = num;
        bNewNum = false;
        if (sLastOpr == "=") { //上一个输入为“=”号，则重新开始算数提示
            prompt.innerHTML = num;
        } else {
            prompt.innerHTML += num;
        }
    } else { //
        if (result.value == "0") {
            result.value = num;
            prompt.innerHTML = num;
        } else {
            result.value += num;
            prompt.innerHTML += num;

        }
    }
    sLastPrompt = prompt.innerHTML;
}


function operate(opr) { //加减乘除，计算方法点击时调用
    if (!sLastPrompt) {
        return;
    }
    var readOut = result.value;
    if (bNewNum && sLastOpr != "=") { //
        switch (opr) {
            case '+':
            case '-':
                prompt.innerHTML = sLastPrompt + opr;
                break;
            case '×':
            case '÷':
                prompt.innerHTML = "(" + sLastPrompt + ")" + opr; //
                break;
            default:
                break;
        }
        sLastOpr = opr;
    } else {
        bNewNum = true;
        switch (sLastOpr) { //加减乘除运算
            case '+':
                nLast += parseFloat(readOut);
                break;
            case '-':
                nLast -= parseFloat(readOut);
                break;
            case '×':
                nLast *= parseFloat(readOut);
                break;
            case '÷':
                if (readOut == 0) {
                    prompt.innerHTML = "除数不能为零！"; //提示
                    nLast = NaN;
                    break; //跳出循环，避免进入default
                }
                nLast /= parseFloat(readOut);
                break;
            default:
                nLast = parseFloat(readOut);                
                break;
        }
        switch (opr) { //算数提示
            case '+':
            case '-':
                prompt.innerHTML += opr;
                break;
            case '×':
            case '÷':
                if (sLastOpr == '×' || sLastOpr == '÷' || sLastOpr == "") {
                    prompt.innerHTML += opr;
                } else {
                    prompt.innerHTML = "(" + prompt.innerHTML + ")" + opr;
                }
                break;
            case '=':
                break;
            default:
                break;
        }

        result.value =Math.round( nLast*100000000)/100000000;
        sLastOpr = opr;
    }
}

function operateComplex(oprc) { // 特殊的一元运算，按钮点击调用 

    var value = result.value;
    switch (oprc) {
        case 'sin': //sin
            value = Math.sin(value);
            prompt.innerHTML = "sin(" + prompt.innerHTML + ")";
            break;
        case 'cos': //cos
            value = Math.cos(value);
            prompt.innerHTML = "cos(" + prompt.innerHTML + ")";
            break;
        case 'tan': //tan
            value = Math.tan(value);
            prompt.innerHTML = "tan(" + prompt.innerHTML + ")";
            break
        case 'sq': //开平方根
            if (value < 0) {
                prompt.innerHTML = "根号下不能小于零！";
                value = NaN;
                break;
            } else {
                value = Math.sqrt(value);
                prompt.innerHTML = "sqrt(" + prompt.innerHTML + ")";
                break;
            }

        case 're': //取倒数
            if (value == 0) {
                prompt.innerHTML = "0没有倒数！";
                result.value = NaN;
                break;
            }
            value = 1 / (value);
            prompt.innerHTML = "1/(" + prompt.innerHTML + ")";
            break;
        case 'ne': //取相反数
            var value = result.value;
            value = -1 * (value);
            prompt.innerHTML = "-(" + prompt.innerHTML + ")";
            break;
    }
    result.value = value;
}


function inputDecimal() { //小数点输入处理
    var value = result.value;
    if (bNewNum) {
        value = "0.";
        prompt.innerHTML += "0.";
        bNewNum = false;
    } else {
        if (value.indexOf(".") == -1) {
            value += ".";
            if (prompt.innerHTML == "") {
                prompt.innerHTML = "0.";
            } else {
                prompt.innerHTML += ".";
            }
        }
    }
    result.value = value;
}

function clearAll() { //清除计算
    nLast = 0;
    sLastOpr = "";
    result.value = "0";
    prompt.innerHTML = "";
    bNewNum = true;
}

