
// Assignment Code
let generateBtn = document.querySelector("#generate");
let numChar;
let upperCase;
let lowerCase;
let numbers;
let specialChar;
let password = "";


function promptUser() {
    password = "";
    numChar = prompt("How many characters would you like your password to be? (8-128 characters");
    while (numChar < 8 || numChar > 128) {
        numChar = prompt("Please add number between 8-128 only, nothing less, nothing more");
    }

    upperCase = confirm("Do you want capitalized(ABC?)");
    lowerCase = confirm("Do you need lowercase (abc?)");
    numbers = confirm("Do you need 123?");
    specialChar = confirm("Do you need symbols?");
}

let charSet = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "abcdefghijklmnopqrstuvwxyz",
    "0123456789",
    "~!@#$%^&*()_+-=,.<>/?;:[]{}\|",
]

let charString = "";

function selectedChar() {

    if (upperCase === true) {
        charString += charSet[0].toString();
    }
    if (lowerCase === true) {
        charString += charSet[1].toString();
    }
    if (numbers === true) {
        charString += charSet[2].toString();
    }
    if (specialChar === true) {
        charString += charSet[3].toString();
    }
}

function generatePassword() {
    let charArray = charString.split("");

    for (var i = 0; i < numChar; i++) {
        let random = Math.floor(Math.random() * charString.length);
        let randomChar = charArray[random];
        console.log(randomChar)
        password += randomChar;
    }
}
// Write password to the #password input
function writePassword() {
    let passwordText = document.querySelector("#password");
    passwordText.value = password;
    setTimeout(() => passwordText.style.display = "none", 5000, passwordText.style.display = "initial");
}

// Add event listeners to generate button
generateBtn.addEventListener("click", promptUser);
generateBtn.addEventListener("click", selectedChar);
generateBtn.addEventListener("click", generatePassword);
generateBtn.addEventListener("click", writePassword);

