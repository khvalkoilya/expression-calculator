function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let poland=[], stackSet=[], array=[], arrayOfNotDigitals=["*", "/", "+", "-","(",")"], arrayOfOperations=["*", "/", "+", "-"], sc={"(":0,")":0};
    let operations = new Set(arrayOfOperations);
    let notDigitals=new Set(arrayOfNotDigitals);
    expr=expr.replace(/\s/g,"");
    for(let i=0;i<expr.length;){
        let str="";
        if(notDigitals.has(expr[i])) {
            array.push(expr[i]);
            i++;
        }
        else {
            while(!notDigitals.has(expr[i])&&i<expr.length) {
                str+=expr[i];
                i++;
            }
            array.push(str);
        }
    }
    for (let item of array) {
        if (item=="(")  {
            stackSet.push(item);
            sc["("]++;
            continue;
        }
        if(item==")"){
            while(stackSet.length!=0&&stackSet[stackSet.length-1]!="(") {
                poland.push(stackSet.pop());
                if(stackSet.length==1 && stackSet[0]!="(") throw new Error("ExpressionError: Brackets must be paired");
            }
            stackSet.pop();
            sc[")"]++;
            continue;
        }
        if (operations.has(item)) {
            if (stackSet.length==0) {
                stackSet.push(item);
            }
            else {
                while (prior(stackSet[stackSet.length-1])>=prior(item) && stackSet.length!=0) {
                    poland.push(stackSet.pop());
                }
                stackSet.push(item);
            }
        }
        else {
            poland.push(item);
        }
    }

    while(stackSet.length!=0)
            poland.push(stackSet.pop());
    if(sc["("]!=sc[")"]) throw new Error("ExpressionError: Brackets must be paired");

    let stackNum=[];
    for(let item of poland) {
        if(operations.has(item)) {
            let num2=stackNum.pop(), num1=stackNum.pop(), rez;
            switch(item) {
                case "+": rez=Number(num1)+Number(num2); break;
                case "-": rez=Number(num1)-Number(num2); break;
                case "*": rez=Number(num1)*Number(num2); break;
                case "/": {
                    if(num2=="0") throw new Error("TypeError: Division by zero.");
                    else rez=Number(num1)/Number(num2)
                    break;
                }
            }
            stackNum.push(String(rez));
        }
        else stackNum.push(item);
    }
    return Number(stackNum.pop());
}
function prior(elem) {
    if (elem=="*" || elem=="/") return 3;
    else {
        if (elem=="+" || elem=="-") return 2;
        else return 1;
    }
    
}



module.exports = {
    expressionCalculator
}