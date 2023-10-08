let inputSlider = document.querySelector("[data-lengthSlider]");
let lengthDisplay=document.querySelector("[data-lengthNumber]");
let passwordDisplay=document.querySelector("[data-passwordDisplay]");
let copyBtn=document.querySelector("[data-copy]");
let copyMsg=document.querySelector("[data-copyMsg]");
let uppercaseCheck=document.querySelector("#uppercase");
let lowercaseCheck=document.querySelector("#lowercase");
let numbersCheck=document.querySelector("#numbers");
let symbolsCheck=document.querySelector("#sysmbols");
let indicator=document.querySelector("[data-indicator]");
let generateBtn=document.querySelector(".generateButton");
let allcheckBox=document.querySelectorAll("input[type=checkbox");
let symbols= '`~!@#$%^&*()_-+={[}]|\:"<.,>?';

let password= "";
let passwordLength=10;
let checkCount=1;
handleSlider();
//set strength circle color to grey

// set passwordLength
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;

}

function setindicator(color){
indicator.style.backgroundColor =color;
//Shadow
}

function getRndInteger(min ,max){
return Math.floor(Math.random() * (max-min))+min;

}

function gernerateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
  return String.fromCharCode (getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode (getRndInteger(65,91));
  }

  function generateSymbol(){
const randNum = getRndInteger(0,symbols.length);
return symbols.charAt(randNum);
  }

  function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower =true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym =true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
        setindicator("#0f0");
    }else if(
        (hasLower|| hasUpper)&&
        (hasNum|| hasSym)&&
        passwordLength>=6
    ) {
        setindicator("#ff0");
    }
    else {
        setindicator("f00");
    }
}

async function copyContent(){
try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText="copied";
}
catch(e)
{
copyMsg.innerText="failed";
}
//to make copy wala span visible
copyMsg.classList.add("acctive");
setTimeout(()=>{
    copyMsg.classList.remove("active");
},2000);
}

function handlecheckBoxChange(){
    checkCount=0;
    allcheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkCount++;
    });

    // special condition 
    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        handleSlider();
    }
}
allcheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckBoxChange);
})



inputSlider.addEventListener('input',(e) =>{
    passwordLength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click' ,()=>
{
    if(passwordDisplay.value)

copyContent();
})

generateBtn.addEventListener('click',()=>
{
    //  none of the checkbox are selected 
    if(checkCount<=0)return;

    if( passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }


    // lets start the journey to find new password

    // remove password
    password="";

    // let's put the stuff mentioned by checkboxes 

    if(uppercaseCheck.checked){
        password+=generateUpperCase();
    }

    if(lowercaseCheck.checked){
        password+=generateLowerCase();
    }

    if(numbersCheck.checked){
        password+=gernerateRandomNumber();
    }

    if(symbolsCheck.checked){
        password+=generateSymbol();
    }



    
});




  

