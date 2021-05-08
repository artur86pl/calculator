// TO DO (13.11.19):
// 1. DONE: document.addEventlistener - zmina tla wyswietlacza
// 2. zabezpieczyc wyswietlacz przed za dlugimi liczbami
// 3. DONE: zaprogramowac zmiane znaku na przycisku
// 4. (CSS) zlikwidowac brzydka niebieska ramke ktora pojawia sie po wcisnieciu przycisku
// 5. addEventlistener wyswietlanie mozliwych wynikow po najechaniu przycisku dzialania
// 6. opracowac formule, ktora weryfikuje czy dzialamy na pierwszej liczbie data[1] czy drugiej data[2] - to powtarza sie przy 3-4 funkcjach
// 7. oskryptowac kolejne dzialania na wyniku ktory otrzymalismy po użyciu przycisku "="
// 8. wieksze liczby na przyciskach

let data = ["", "", ""];
const glassAudio = new Audio("glass.mp3");

document.getElementById("display").addEventListener("click", function(){document.getElementById("display").style.backgroundImage = "url(glassBG5.jpg)"});
document.getElementById("display").addEventListener("click", function(){glassAudio.play()});

const numberButton = (value, data, displayFn) =>
{
    if (data[0] == "") data[1] = data[1] + value;
    else data[2] = data[2] + value;
    displayFn(data);    
    console.log(data);
    return data;
}

const dottButton = (value, data, displayFn, dottAvelable) => 
/*nie wiem czy lepiej to scalić z numberButton() w mysl idei DRY, czy rozdzielic, 
zeby dla jednego przypadku nie zaciemniac pozostalych przyciskow*/
{
    if (data[0] == "" && dottAvelable(data[1])) data[1] = data[1] + value;
    else if (data[0] != "" && dottAvelable(data[2])) data[2] = data[2] + value;
    else console.log("there is dott alredy");
    displayFn(data);    
    console.log(data);
    return data;
}

const signButton = (value, data, displayFn) =>
{
    data[0] = value;
    console.log(data);
    displayFn(data);
    return data;
}

const dottAvelable = (tekst) =>
{
    
    for (i=0; i < tekst.length; i++)
        if (tekst.substring(i, i+1) == ".")
        {
            console.log("jest kropka");
            const avelable = false;
            return avelable;
        }
        else
        {
            console.log("nie ma");            
        }
    const avelable = true;    
    return avelable;
}

// const isDotted 

const Clear = (data) =>
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

const back = (data, cutString, displayFn) =>    /* pewnie za dużo IFow, jeszcze do tego wroce, ale przynajmniej przecwiczyłem zaprzeczenia */
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

    switch (data[0])
    {
        case "+":
            result = number1 + number2;
            break;
    }
    switch (data[0])
    {
        case "-":
            result = number1 - number2;
            break;
    }
    switch (data[0])
    {
        case "*":
            result = number1 * number2;
            break;
    }
    switch (data[0])
    {
        case "/":
            result = number1 / number2;
            break;
    }
    switch (data[0])
    {
        case "%":
            result = number1 % number2;
            break;
    }
    console.log(result);
    displayResultFn(result);
}

const changeSingButton = (data, displayFn, changeSignFn) => 
{
    if (!data[0])   data[1] = "" + changeSignFn(data[1])    //nie moglem znalezc lepszego sposoby na konwersje na string xD 
    if (!!data[0])  data[2] = "" + changeSignFn(data[2])    //a nie chce tracic kontroli nad typem danych
    displayFn(data);    
    console.log(data);
    return data;
}

const changeSignFn = (oneOfData) => oneOfData = parseFloat(oneOfData) * (-1);

const displayFn = (data) => document.getElementById("calculations").innerHTML=data[1]+data[0]+data[2];

const displayResultFn = (result) => document.getElementById("result").innerHTML=result;