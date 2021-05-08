let number1 = "";
let number2 = "";
let sign = "";

const setSign = (value) => 
{
    sign = value;
    document.getElementById("calculations").innerHTML=number1+sign+number2;
    return sign;
}


const Clear = () =>
{
    number1 = "";
    number2 = "";
    sign = "";
    document.getElementById("calculations").innerHTML=0;
    document.getElementById("result").innerHTML=0;
}

const plasMinus = (number1) => //jak przypisac liczne ze zmienionym znakiem do number1/2?
{
    n1 = parseInt(-number1);
    document.getElementById("calculations").innerHTML=n1;
    return n1;
}

const readNumber = (digit) =>
{
    console.log(sign);
    if (sign == "") {
        number1 = number1 + digit;
    }
    else {
        number2 = number2 + digit;
    }
    document.getElementById("calculations").innerHTML=number1+sign+number2;
    console.log("1:", number1, "2:", number2, "znak:", sign);        
}

const dzialanie = (number1, sign, number2) =>
{
    const n1 = parseInt(number1);
    const n2 = parseInt(number2);
    let wynik;

    switch (sign)
    {  
        case "+": 
            wynik = n1 + n2;
            break;
        case "-":
            wynik = n1 - n2;
            break;
        case "*":
            wynik = n1 * n2;
            break;
        case "/":
            wynik = n1 / n2;
            break;
        case "%":
            wynik = n1 % n2;
            break;
    }
    document.getElementById("result").innerHTML=wynik;
    console.log("1:", number1, "2:", number2, "znak:", sign, "wynik:", wynik);
    return wynik;
}

// document.addEventListener("click", console.log("klikniecie"));
document.addEventListener("click", console.log("klik"));