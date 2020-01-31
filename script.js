


// Assignment Code
var generateBtn = document.querySelector("#generate");
var numChar;
var upperCase;
var lowerCase;
var numbers;
var specialChar;
var password = "";


function promptUser() {
    password = "";
    numChar = prompt("How many characters would you like your password to be? (8-128 characters");
    while (numChar < 8 || numChar > 128) {
    numChar = prompt('Character choice must be between 8 and 128 characters. Please select the number of characters you would like for your password.');
    }

    upperCase = confirm("Do you need ABC?");
    lowerCase = confirm("DO you need abc?");
    numbers = confirm("DO you need numbers?");
    specialChar = confirm("Do you need symbols?");
}

var charSet = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "abcdefghijklmnopqrstuvwxyz",
    "0123456789",
    "~!@#$%^&*()_+-=,.<>/?;:[]{}\|",
];

var charString = "";

function selectedChar() {

    if (upperCase == true) {
        charString = charString + charSet[0].toString();
    }
    if (lowerCase == true) {
        charString = charString + charSet[1].toString();
    }
    if (numbers == true) {
        charString = charString + charSet[2].toString();
    }
    if (specialChar == true) {
        charString = charString + charSet[3].toString();
    }

}

function generatePassword() {

    var charArray = charString.split("");

    for (var i = 0; i < numChar; i++) {

        var random = Math.floor(Math.random() * charString.length);
        var randomChar = charArray[random];

        console.log(`Random ${random} Char ${i + 1}: ${randomChar}`)

        password += randomChar;

    }

}
// Write password to the #password input
function writePassword() {

    var passwordText = document.querySelector("#password");

    passwordText.value = password;

}

// Add event listeners to generate button
generateBtn.addEventListener("click", promptUser);
generateBtn.addEventListener("click", selectedChar);
generateBtn.addEventListener("click", generatePassword);
generateBtn.addEventListener("click", writePassword);