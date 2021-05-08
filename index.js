// TO DO (13.11.19):
// 01. DONE: document.addEventlistener - zmina tla wyswietlacza
// 02. zabezpieczyc wyswietlacz przed za dlugimi liczbami
// 03. DONE: zaprogramowac zmiane znaku na przycisku
// 04. DONE: (gdyby nie odwołania do "em" to nie było by problemu): (CSS) zlikwidowac brzydka niebieska ramke ktora pojawia sie po wcisnieciu przycisku
// 05. addEventlistener wyswietlanie mozliwych wynikow po najechaniu przycisku dzialania
// 06. DONE: (changeNumberButton + Callback): opracowac formule, ktora weryfikuje czy dzialamy na pierwszej liczbie data[1] czy drugiej data[2] - to powtarza sie przy 3-4 funkcjach
// 07. DONE: (22.11.19): oskryptowac kolejne dzialania na wyniku ktory otrzymalismy po użyciu przycisku "="
// 08. DONE: wieksze liczby na przyciskach
// 09. kalkulator sie nie miesci na mobilkach przy ekranie obroconym w poprzek
// 10. zabezpieczyc wykonywanie dzialan jezeli ktoras z liczb jest pusta

let data = ["", "", ""];

const changeNumberButton = (Callback, value, data, displayFn) => // ... dottAvelableFn)
{
    let numberToChange;
    if (!data[0]) numberToChange = data[1] 
    else numberToChange = data[2];
    
    numberToChange = Callback(numberToChange, value, dottAvelableFn) //czy wolno tu podać parametr dottAvelableFn, którego nie podawaliśmy w funkcji wyższego rzędu?
    
    if (!data[0]) data[1] = numberToChange
    else data[2] = numberToChange;
    displayFn(data);    
    console.log(data);
    return data;
}

const numberGrowFn = (oneOfNumbers, value) => oneOfNumbers = oneOfNumbers + value;

const changeSignFn = (oneOfNumbers) => oneOfNumbers = parseFloat(oneOfNumbers) * (-1) + "";
//nie moglem znalezc lepszego sposoby na konwersje na string xD a nie chce tracic kontroli nad typem danych

const addDottFn = (oneOfNumbers, value, dottAvelableFn) => 
{
    if (dottAvelableFn(oneOfNumbers)) oneOfNumbers = oneOfNumbers + value;
    return oneOfNumbers;
}

// czy lepsze jest wczesniejsze uzycie return
const dottAvelableFn = (tekst) =>
{
    let avelable = true;
    for (i=0; i < tekst.length; i++)    
        if (tekst.substring(i, i+1) == ".")
        {
            console.log("jest kropka");
            avelable = false;
            return avelable;
        }
    return avelable;
}

//czy lepszy jest krotyszy zapis?
const dottAvelableFn2 = (tekst) =>
{
    let avelable = true;
    for (i=0; i < tekst.length; i++)    
        if (tekst.substring(i, i+1) == ".") avelable = false;
    return avelable;
}

const signButtonFn = (value, data, displayFn) =>
{
    data[0] = value;
    console.log(data);
    displayFn(data);
    return data;
}

const clearFn = (data) =>
{
    for (i = 0; i < 3; i++)
    {                           /*  data[0] = "";    */
        data[i] = "";           /*  data[1] = "";    */
    }                           /*  data[2] = "";    */
    console.log(data);
    displayFn([0, 0, 0]);
    displayResultFn(0);
    document.getElementById("display").style.backgroundImage = "linear-gradient(to left, palegreen, turquoise)"
    return data;
}

const backFn = (data, cutString, displayFn) =>    /* pewnie za dużo IFow, jeszcze do tego wroce, ale przynajmniej przecwiczyłem zaprzeczenia */
{
    if(!!data[2] && !!data[0] && !!data[1]) data[2] = cutString(data[2])    
    else if (!data[2] && !!data[0] && !!data[1]) data[0] = cutString(data[0])
    else if (!data[2] && !data[0] && !!data[1]) data[1] = cutString(data[1])
    else data = ["", "", ""] /* to raczej nie powinno wystapic, ale narazie zostawiam jako bezpiecznik */
    console.log(data);
    if (!!data[1]) displayFn(data)
    else displayFn([0, 0, 0])
    return data;
}

const cutString = (stringToCut) => stringToCut.substring(0, stringToCut.length-1);

const equationButton = (data) =>
{
    const number1 = parseFloat(data[1]);
    const number2 = parseFloat(data[2]);
    let result;
    if (number1 != NaN)
    switch (data[0])
    {
        case "+": result = number1 + number2;   
        break;
        case "-": result = number1 - number2;   
        break;
        case "*": result = number1 * number2;   
        break;
        case "/": result = number1 / number2;   
        break;
        case "%": result = number1 % number2;   
        break;
    }
    console.log(result);
    displayResultFn(result);
}

const displayFn = (data) => document.getElementById("calculations").innerHTML=data[1]+data[0]+data[2];

const displayResultFn = (result) => document.getElementById("result").innerHTML=result;

const glassAudio = new Audio("glass.mp3");

document.getElementById("display").addEventListener("dblclick", () => document.getElementById("display").style.backgroundImage = "url(glassBG.jpg)");
document.getElementById("display").addEventListener("dblclick", () => glassAudio.play());


// nie do konca rozumiem co napisalem, bo to zapozyczony i zadaptowany kod
const resultSimulation = (data) => 
{
    const buttonsArray = document.getElementsByClassName("signButton");
    for (let i = 0; i < buttonsArray.length; i++)
        {
            buttonsArray[i].addEventListener("mouseover",() => equationButton([buttonsArray[i].value, data[1], data[2]]));
            buttonsArray[i].addEventListener("mouseout", () => equationButton(data));
        }
}

window.onload = resultSimulation(data);

// oryginal wygladal tak:

// window.onload = function(){
//     var buttons = document.getElementsByClassName('btn');
//     for (var i = 0; i < buttons.length; i++) {
//         buttons[i].addEventListener('click', function(){
//             alert('I was clicked!');
//         });
//     }
// };