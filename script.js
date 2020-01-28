window.onload = function () {
  //run js code here


// Assignment Code
var generateBtn = document.querySelector("#generate");
var charOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"];

// Pick random Character.

  var getPwdLenght = parseInt(prompt("Password length between 8 and 128, please?", ""));
  var pwd = "";
  for (var i = 0; i <= getPwdLenght; i++) {
  var getCharOptions = charOptions[Math.floor(Math.random() * charOptions.length)];
  pwd += getCharOptions;
}
console.log(pwd);

// Write password to the #password input, NOT define yet.
function writePassword() {


  var passwordText = document.querySelector("#password");
  passwordText.value = pwd;
  

}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);{
  
  var getLowUpperCase = confirm("You need low and upper cases!");
  var getSymbNumb = confirm("Also you need Numbers and Symbols, not opnional.");

  
}

function defineCriteriaForPassword() {

  // We need to generate random number to find a random character
}

}




