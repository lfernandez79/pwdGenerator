
// Assignment Code
const generateBtn = document.querySelector("#generate");
const resetBtn = document.getElementById("reset")
const slider = document.getElementById("customRange1")
const output = document.getElementById("sliderCounter")
const toggleBtnUpper = document.getElementById("customSwitch1")
const toggleBtnLower = document.getElementById("customSwitch2")
const toggleBtnNum = document.getElementById("customSwitch3")
const toggleBtnSymb = document.getElementById("customSwitch4")
const hsimp = document.getElementsByClassName("hsimp")
let secondsLeft = 10;

let charSet = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "abcdefghijklmnopqrstuvwxyz",
    "0123456789",
    "~!@#$%^&*()_+-=,.<>/?;:[]{}\|",
]

output.textContent = slider.value;
slider.oninput = () => {
    output.textContent = slider.value
}


let charString = "";

const charSelecUpper = () => {
    if(toggleBtnUpper.checked === true) {
        charString += charSet[0].toString()
        console.log(charString)
    } else {
        charString = charString.replace(charSet[0], "");
        console.log(charString);
      }
}

const charSelectLower = () => {
    if(toggleBtnLower.checked === true) {
        charString += charSet[1].toString()
        console.log(charString)
    } else {
        charString = charString.replace(charSet[1], "");
        console.log(charString);
    }
}

const num = () => {
    if (toggleBtnNum.checked === true) {
        charString += charSet[2].toString()
        console.log(charString)
    }
    else {
        charString = charString.replace(charSet[2], "");
    }
}

const symbols = () => {
    if (toggleBtnSymb.checked === true) {
        charString += charSet[3].toString()
        console.log(charString)
    } else {
        charString = charString.replace(charSet[3], "");
    }
}

let password = "";

const generatePassword = () => {
  if (charString === "") {
    alert("Please select at least one character type to generate a password");
    location.reload();
  }

  const charArray = charString.split("");

  for (let i = 0; i < slider.value; i++) {
    const random = Math.floor(Math.random() * charString.length);
    const randomChar = charArray[random];
    password += randomChar;
    console.log(password);
  }
  generateBtn.disabled = true;
};

// Write password to the #password input then after 5 sec password is removed, then clear to original value "empty" and ready to generate another password
const writePassword = () => {
    
    const passwordText = document.getElementById("password");
    passwordText.textContent = password;

    let timeInterval = setInterval(() => {
        secondsLeft--;
        const counter = document.getElementById("counter")
        counter.textContent = secondsLeft + " Seconds left, grab it!"
        
        if (secondsLeft <= 0 || charString === "") {
            clearInterval(timeInterval)
            passwordText.style.display = "none"
            counter.textContent = "Click reset button to start again"
        }
    }, 1000)
}

const resetVariables = () => {
    charString = "";
    password = "";
  }

const reload = () => {
    resetVariables();
    location.reload();
}

generateBtn.addEventListener("click", generatePassword);
generateBtn.addEventListener("click", writePassword);
toggleBtnUpper.addEventListener("change", charSelecUpper);
toggleBtnLower.addEventListener("change", charSelectLower);
toggleBtnNum.addEventListener("change", num);
toggleBtnSymb.addEventListener("change", symbols);
resetBtn.addEventListener("click", reload);