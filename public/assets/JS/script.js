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
const strengthEl = document.getElementById("strength");
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
  slider.setAttribute("aria-valuenow", slider.value);
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
let lastCharsetSize = 0;

// Estimate crack time assuming an offline attacker at 10 billion guesses/sec.
// Works in log10 space because charsetSize^length blows past Number.MAX_SAFE_INTEGER fast.
const estimateStrength = (length, charsetSize) => {
  if (length === 0 || charsetSize === 0) {
    return { label: "Very Weak", timeString: "instantly" };
  }
  const log10Seconds = length * Math.log10(charsetSize) - Math.log10(2) - 10;

  let label;
  if (log10Seconds < Math.log10(60)) label = "Very Weak";
  else if (log10Seconds < Math.log10(86400)) label = "Weak";
  else if (log10Seconds < Math.log10(31557600)) label = "Fair";
  else if (log10Seconds < Math.log10(31557600 * 1000)) label = "Strong";
  else label = "Very Strong";

  // Each unit's `upperLog` is the threshold where we switch to the next-larger unit.
  const units = [
    { upperLog: Math.log10(60), name: "seconds", div: 1 },
    { upperLog: Math.log10(3600), name: "minutes", div: 60 },
    { upperLog: Math.log10(86400), name: "hours", div: 3600 },
    { upperLog: Math.log10(2629800), name: "days", div: 86400 },
    { upperLog: Math.log10(31557600), name: "months", div: 2629800 },
    { upperLog: Infinity, name: "years", div: 31557600 },
  ];

  let timeString;
  if (log10Seconds < 0) {
    timeString = "instantly";
  } else if (log10Seconds > 17.6) {
    timeString = "longer than the age of the universe";
  } else {
    const unit = units.find((u) => log10Seconds < u.upperLog);
    const value = Math.pow(10, log10Seconds - Math.log10(unit.div));
    const rounded = Math.max(1, Math.round(value));
    if (rounded < 1000) {
      timeString = `${rounded} ${unit.name}`;
    } else if (value < 1e6) {
      timeString = `${Math.round(value / 1000)} thousand ${unit.name}`;
    } else if (value < 1e9) {
      timeString = `${(value / 1e6).toFixed(1)} million ${unit.name}`;
    } else {
      timeString = `${(value / 1e9).toFixed(1)} billion ${unit.name}`;
    }
  }

  return { label, timeString };
};

const generatePassword = () => {
  if (selectedSets.size === 0) {
    alert("Please select at least one character type to generate a password");
    return;
  }

  const charPool = charSets
    .filter((_, i) => selectedSets.has(i))
    .join("");
  lastCharsetSize = charPool.length;
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

  if (password) {
    const { label, timeString } = estimateStrength(Number(slider.value), lastCharsetSize);
    strengthEl.textContent = `${label} — would take ${timeString} to crack`;
  }

  let timeInterval = setInterval(() => {
    secondsLeft--;
    const counter = document.getElementById("counter");
    counter.textContent = secondsLeft + " Seconds left, grab it!";

    if (secondsLeft <= 0 || selectedSets.size === 0) {
      clearInterval(timeInterval);
      passwordText.style.display = "none";
      copyBtn.style.display = "none";
      strengthEl.textContent = "";
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
