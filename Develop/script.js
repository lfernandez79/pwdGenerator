// Assignment Code
var generateBtn = document.querySelector("#generate");

var lowCase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var upperCase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var numbers = ["1","2","3","4","5","6","7","8","9","0"];
var symb = ["~","!","@","#","$","%","^","&","*","(",")","_","+"];

var getLow = lowCase[Math.floor(Math.random() * lowCase.length)];
var getUpper = upperCase[Math.floor(Math.random() * upperCase.length)];
var getNum = numbers[Math.floor(Math.random() * numbers.length)];
var getSymb = symb[Math.floor(Math.random() * symb.length)];

console.log(getLow, getUpper, getNum, getSymb);

// Write password to the #password input, NOT define yet.
function writePassword() {

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function defineCriteriaForPassword() {

  // We need to generate random number to find a random character
}





// for (let index = 0; index < array.length; index++) {
//   const element = array[index];
  
// }

