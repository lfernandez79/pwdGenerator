// Assignment Code
const generateBtn = document.querySelector("#generate");
const resetBtn = document.getElementById("reset");
const slider = document.getElementById("customRange1");
const output = document.getElementById("sliderCounter");
const toggleBtnUpper = document.getElementById("customSwitch1");
const toggleBtnLower = document.getElementById("customSwitch2");
const toggleBtnNum = document.getElementById("customSwitch3");
const toggleBtnSymb = document.getElementById("customSwitch4");
const copyBtn = document.getElementById("copy");
let secondsLeft = 10;

const charSets = [
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "abcdefghijklmnopqrstuvwxyz",
  "0123456789",
  "~!@#$%^&*()_+-=,.<>/?;:[]{}|",
];

output.textContent = slider.value;
slider.oninput = () => {
  output.textContent = slider.value;
};

const selectedSets = new Set();

const toggleCharSet = (index) => {
  return () => {
    if (selectedSets.has(index)) {
      selectedSets.delete(index);
    } else {
      selectedSets.add(index);
    }
  };
};

let password = "";

const generatePassword = () => {
  if (selectedSets.size === 0) {
    alert("Please select at least one character type to generate a password");
    return;
  }

  const charPool = charSets
    .filter((_, i) => selectedSets.has(i))
    .join("");
  const charArray = charPool.split("");
  const randomValues = new Uint32Array(Number(slider.value));
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < slider.value; i++) {
    const randomChar = charArray[randomValues[i] % charArray.length];
    password += randomChar;
  }
  generateBtn.disabled = true;
};

// Write password to the #password input then after 5 sec password is removed, then clear to original value "empty" and ready to generate another password
const writePassword = () => {
  const passwordText = document.getElementById("password");
  passwordText.textContent = password;
  copyBtn.style.display = "inline-block";

  let timeInterval = setInterval(() => {
    secondsLeft--;
    const counter = document.getElementById("counter");
    counter.textContent = secondsLeft + " Seconds left, grab it!";

    if (secondsLeft <= 0 || selectedSets.size === 0) {
      clearInterval(timeInterval);
      passwordText.style.display = "none";
      copyBtn.style.display = "none";
      counter.textContent = "Click reset button to start again";
    }
  }, 1000);
};

const resetVariables = () => {
  selectedSets.clear();
  password = "";
};

const reload = () => {
  resetVariables();
  location.reload();
};

generateBtn.addEventListener("click", generatePassword);
generateBtn.addEventListener("click", writePassword);
toggleBtnUpper.addEventListener("change", toggleCharSet(0));
toggleBtnLower.addEventListener("change", toggleCharSet(1));
toggleBtnNum.addEventListener("change", toggleCharSet(2));
toggleBtnSymb.addEventListener("change", toggleCharSet(3));
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(password).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
    }, 2000);
  });
});
resetBtn.addEventListener("click", reload);
