
// Assignment Code
let generateBtn = document.querySelector("#generate");
let resetBtn = document.getElementById("reset")
let slider = document.getElementById("customRange1")
let output = document.getElementById("sliderCounter")
let toggleBtnUpper = document.getElementById("customSwitch1")
let toggleBtnLower = document.getElementById("customSwitch2")
let toggleBtnNum = document.getElementById("customSwitch3")
let toggleBtnSymb = document.getElementById("customSwitch4")
let secondsLeft = 8;

let charSet = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "abcdefghijklmnopqrstuvwxyz",
    "0123456789",
    "~!@#$%^&*()_+-=,.<>/?;:[]{}\|",
]

let charString = "";
let upperCase;
let lowerCase;
let numbers;
let specialChar;


output.innerHTML = slider.value ;
slider.oninput = () => {
    output.innerHTML = slider.value
}

const charSelecUpper = () => {
    if(toggleBtnUpper.checked === true) {
        charString += charSet[0].toString()
        console.log(charString)
    } 
}

const charSelectLower = () => {
    if(toggleBtnLower.checked === true) {
        charString += charSet[1].toString()
        console.log(charString)
    }
}

const num = () => {
    if (toggleBtnNum.checked === true) {
        charString += charSet[2].toString()
        console.log(charString)
    }
}

const symbols = () => {
    if (toggleBtnSymb.checked === true) {
        charString += charSet[3].toString()
        console.log(charString)
    }
}

let password = "";
const generatePassword = () => {
    let charArray = charString.split("");
 
    for (let i = 0; i < slider.value; i++) {
        let random = Math.floor(Math.random() * charString.length);
        let randomChar = charArray[random];
        password += randomChar;
        console.log(password)
    }
    generateBtn.disabled = true;
}
// Write password to the #password input then after 5 sec password is removed, then clear to original value "empty" and ready to generate another password
const writePassword = () => {
    let passwordText = document.getElementById("password");
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
generateBtn.addEventListener("click", writePassword);
toggleBtnUpper.addEventListener("change", charSelecUpper)
toggleBtnLower.addEventListener("change", charSelectLower)
toggleBtnNum.addEventListener("change", num)
toggleBtnSymb.addEventListener("change", symbols)
resetBtn.addEventListener("click", reload)


