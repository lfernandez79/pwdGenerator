
// Assignment Code
let generateBtn = document.querySelector("#generate");
let resetBtn = document.getElementById("reset")
let slider = document.getElementById("customRange1")
let output = document.getElementById("sliderCounter")
let toggleBtnUpper = document.getElementById("customSwitch1")
let toggleBtnLower = document.getElementById("customSwitch2")
let toggleBtnNum = document.getElementById("customSwitch3")
let toggleBtnSymb = document.getElementById("customSwitch4")
let secondsLeft = 5;

let charSet = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "abcdefghijklmnopqrstuvwxyz",
    "0123456789",
    "~!@#$%^&*()_+-=,.<>/?;:[]{}\|",
]

// let numChar;
// const promptUser = () => {
//     password = "";
//     numChar = prompt("How many characters would you like your password to be? (8-128 characters");
//     while (numChar < 8 || numChar > 128) {
//         numChar = prompt("Please add number between 8-128 only, nothing less, nothing more");
//     }
//     generateBtn.disabled = true;
//     upperCase = confirm("Do you want capitalized(ABC?)");
//     lowerCase = confirm("Do you need lowercase (abc?)");
//     numbers = confirm("Do you need 123?");
//     specialChar = confirm("Do you need symbols?");
// }


let charString = "";
let upperCase;
let lowerCase;
let numbers;
let specialChar;

// const selectedChar = () => {

//     if (upperCase === true) {
//         charString += charSet[0].toString();  
//     }
//     if (lowerCase === true) {
//         charString += charSet[1].toString();
//     }
//     if (numbers === true) {
//         charString += charSet[2].toString();
//     }
//     if (specialChar === true) {
//         charString += charSet[3].toString();
//     }
// }

output.innerHTML = slider.value ;
slider.oninput = () => {
    output.innerHTML = slider.value
}

const charSelecUpper = () => {
    if(toggleBtnUpper.checked === true) {
        charString = charSet[0].toString()
        console.log(charString)
    } 
}

const charSelectLower = () => {
    if(toggleBtnLower.checked === true) {
        charString = charSet[1].toString()
        console.log(charString)
    }
}

const num = () => {
    if (toggleBtnLower.checked === true) {
        charString = charSet[2].toString()
        console.log(charString)
    }
}

const symbols = () => {
    if (toggleBtnLower.checked === true) {
        charString = charSet[3].toString()
        console.log(charString)
    }
}

let password = "";
const generatePassword = () => {
    let charArray = charString.split("");
 
    for (let i = 0; i < numChar; i++) {
        let random = Math.floor(Math.random() * charString.length);
        let randomChar = charArray[random];
        password += randomChar;
        console.log(password)
    }
}
// Write password to the #password input then after 5 sec password is removed, then clear to original value "empty" and ready to generate another password
const writePassword = () => {
    let passwordText = document.querySelector("#password");
    passwordText.value = password;
    
    let timeInterval = setInterval(() => {
        secondsLeft--;
        let counter = document.getElementById("counter")
        counter.innerHTML = secondsLeft + " Seconds left, grab it!"
        
        if (secondsLeft <= 0) {
            clearInterval(timeInterval)
            passwordText.style.display = "none"
            counter.innerHTML = "Click reset button to start again"
        }
    }, 1000)
}

const reload = () => {
    location.reload()
}

// Add event listeners to generate button

// generateBtn.addEventListener("click", promptUser);
// generateBtn.addEventListener("click", selectedChar);
generateBtn.addEventListener("click", generatePassword);
// generateBtn.addEventListener("click", writePassword);
toggleBtnUpper.addEventListener("change", charSelecUpper)
toggleBtnLower.addEventListener("change", charSelectLower)
toggleBtnNum.addEventListener("change", num)
toggleBtnSymb.addEventListener("change", symbols)
resetBtn.addEventListener("click", reload)


