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

// Tab switching
const tabs = document.querySelectorAll(".tab");
const panels = {
  generate: document.getElementById("generate-panel"),
  check: document.getElementById("check-panel"),
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.panel;
    tabs.forEach((t) => {
      const isActive = t === tab;
      t.classList.toggle("active", isActive);
      t.setAttribute("aria-selected", String(isActive));
    });
    Object.entries(panels).forEach(([key, el]) => {
      el.hidden = key !== target;
    });
  });
});

// Check-your-own
const checkInput = document.getElementById("check-input");
const checkStrength = document.getElementById("check-strength");
const checkTips = document.getElementById("check-tips");
const suggestionBlock = document.getElementById("suggestion-block");
const suggestBtn = document.getElementById("suggest-btn");
const suggestionResult = document.getElementById("suggestion-result");
const suggestedPasswordEl = document.getElementById("suggested-password");
const suggestedStrengthEl = document.getElementById("suggested-strength");
const copySuggestionBtn = document.getElementById("copy-suggestion");

const symbolChars = new Set("~!@#$%^&*()_+-=,.<>/?;:[]{}|");

const detectCategories = (value) => ({
  upper: /[A-Z]/.test(value),
  lower: /[a-z]/.test(value),
  number: /[0-9]/.test(value),
  symbol: [...value].some((c) => symbolChars.has(c)),
});

const charsetSizeFor = (cats) =>
  (cats.upper ? 26 : 0) + (cats.lower ? 26 : 0) + (cats.number ? 10 : 0) + (cats.symbol ? 28 : 0);

const validateCustom = () => {
  const value = checkInput.value;
  suggestionResult.hidden = true;

  if (value.length === 0) {
    checkStrength.textContent = "";
    checkTips.innerHTML = "";
    suggestionBlock.hidden = true;
    return;
  }

  const cats = detectCategories(value);
  const charsetSize = charsetSizeFor(cats);
  const { label, timeString } = estimateStrength(value.length, charsetSize);
  checkStrength.textContent = `${label} — would take ${timeString} to crack`;

  const tips = [];
  if (value.length < 8) tips.push(`Make it at least 8 characters (currently ${value.length})`);
  if (!cats.upper) tips.push("Add an uppercase letter");
  if (!cats.lower) tips.push("Add a lowercase letter");
  if (!cats.number) tips.push("Add a number");
  if (!cats.symbol) tips.push("Add a symbol");

  checkTips.innerHTML = tips.map((t) => `<li>${t}</li>`).join("");
  suggestionBlock.hidden = false;
};

const randomFrom = (str) => {
  const r = new Uint32Array(1);
  crypto.getRandomValues(r);
  return str[r[0] % str.length];
};

const randomInt = (max) => {
  const r = new Uint32Array(1);
  crypto.getRandomValues(r);
  return r[0] % max;
};

const allIndicesMatching = (str, predicate) => {
  const out = [];
  for (let i = 0; i < str.length; i++) if (predicate(str[i])) out.push(i);
  return out;
};

// Build a stronger variant of the user's input: capitalize / leet-substitute
// to fill missing character classes, then pad to a random length for real
// strength (leet alone is well-known to attackers; length is what helps).
// Every choice is randomized so repeated clicks produce different suggestions.
const suggestStronger = (input) => {
  let result = input;
  const numLeet = { a: "4", A: "4", e: "3", E: "3", i: "1", I: "1", o: "0", O: "0", s: "5", S: "5", t: "7", T: "7", l: "1", L: "1" };
  const symLeet = { a: "@", A: "@", i: "!", I: "!", s: "$", S: "$", e: "&", E: "&", o: "*", O: "*" };

  const substituteRandom = (map, fallbackPool) => {
    const indices = allIndicesMatching(result, (c) => map[c]);
    if (indices.length > 0) {
      const idx = indices[randomInt(indices.length)];
      result = result.slice(0, idx) + map[result[idx]] + result.slice(idx + 1);
    } else {
      const pos = randomInt(result.length + 1);
      result = result.slice(0, pos) + randomFrom(fallbackPool) + result.slice(pos);
    }
  };

  const transformRandom = (predicate, transform, fallbackPool) => {
    const indices = allIndicesMatching(result, predicate);
    if (indices.length > 0) {
      const idx = indices[randomInt(indices.length)];
      result = result.slice(0, idx) + transform(result[idx]) + result.slice(idx + 1);
    } else {
      const pos = randomInt(result.length + 1);
      result = result.slice(0, pos) + randomFrom(fallbackPool) + result.slice(pos);
    }
  };

  if (!detectCategories(result).upper) {
    transformRandom((c) => /[a-z]/.test(c), (c) => c.toUpperCase(), "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  }
  if (!detectCategories(result).lower) {
    transformRandom((c) => /[A-Z]/.test(c), (c) => c.toLowerCase(), "abcdefghijklmnopqrstuvwxyz");
  }
  if (!detectCategories(result).number) substituteRandom(numLeet, "0123456789");
  if (!detectCategories(result).symbol) substituteRandom(symLeet, "~!@#$%^&*()_+-=,.<>/?;:[]{}|");

  // Always add at least 2 chars so already-long inputs still vary per click;
  // random target in 12–16 range; insert at random positions.
  const fullPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+-=,.<>/?;:[]{}|";
  const target = Math.max(result.length + 2, 12 + randomInt(5));
  while (result.length < target) {
    const pos = randomInt(result.length + 1);
    result = result.slice(0, pos) + randomFrom(fullPool) + result.slice(pos);
  }
  return result;
};

suggestBtn.addEventListener("click", () => {
  const value = checkInput.value;
  if (value.length === 0) return;
  const stronger = suggestStronger(value);
  const cats = detectCategories(stronger);
  const { label, timeString } = estimateStrength(stronger.length, charsetSizeFor(cats));
  suggestedPasswordEl.textContent = stronger;
  suggestedStrengthEl.textContent = `${label} — would take ${timeString} to crack`;
  suggestionResult.hidden = false;
});

copySuggestionBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(suggestedPasswordEl.textContent).then(() => {
    copySuggestionBtn.textContent = "Copied!";
    setTimeout(() => {
      copySuggestionBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
    }, 2000);
  });
});

checkInput.addEventListener("input", validateCustom);
