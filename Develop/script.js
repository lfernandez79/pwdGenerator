
var generateBtn = document.querySelector("#generate");

var charOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"];

// Pick random Character. But I cannot get it to get 8 characters minimal it just one at the time.
var passLength = 8;
var pwd = "";
var getCharOptions = charOptions[Math.floor(Math.random() * charOptions.length)];

for (var i = 0; i <= charOptions.length; i++) {
  var pwd = charOptions[i];
  
}

console.log(getCharOptions);

// Write password to the #password input, NOT define yet.
function writePassword() {
  
  var getPwdLenght = Number(prompt("Password length between 8 and 128, please?", ""));
  var getLowUpperCase = confirm("You need low and upper cases!");
  var getSymbNumb = confirm("Also you need Numbers and Symbols, not opnional.");
  var password = generatePassword();
  
  var passwordText = document.querySelector("#password");
  passwordText.value = password;

}

// What fuction to call when click button.
generateBtn.addEventListener("click", writePassword);{

  
}

function defineCriteriaForPassword() {

  // We need to generate random number to find a random character
}






