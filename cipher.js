// This program is a basic Vigenere Cipher. It encrypts text, based on a key
// Title: Vigenere Cipher
// Programmer: Nils Johnson
// Last Modified: 1/12/2017, 3:35pm

var isValidPlainText;
var isValidKey;
const MAX_CHAR = 26;

var main = function()
{
	var plainText = getStringOfCharAndSpaces(document.getElementById("plain-text"));
	var key = getStringOfChar(document.getElementById("key"));
	var encryptedText;

	var encrypt = document.getElementById("encrypt").checked;
	var dycrypt = document.getElementById("decrypt").checked;

	if (isValidPlainText && isValidKey)
	{
		encryptedText = vigenere(plainText, key);
		document.getElementById("encrypted-text").innerHTML = encryptedText.join('');
	}
	return;
};

var getStringOfCharAndSpaces = function(input)
{
	var strRaw = input.value;
	var str = [];
	for (var i = 0; i < strRaw.length; i++)
	{
		if (strRaw[i] >= 'A' && strRaw[i] <= 'Z' || strRaw[i] >= 'a' && strRaw[i] <= 'z' || strRaw[i] === ' ')
		{
			removeError(input);
			isValidPlainText = true;
			str[i] = strRaw[i];
		}
		else
		{
			showError(input);
			isValidPlainText = false;
			return;
		}
	}
	return str; 
};

var showError = function (element) {
	element.classList.add("error");
};

var removeError = function (element) {
	element.classList.remove("error");
};

var getStringOfChar = function(input)
{
	var strRaw = input.value;
	var str = [];
	for (var i = 0; i < strRaw.length; i++)
	{
		if (strRaw[i] >= 'A' && strRaw[i] <= 'Z' || strRaw[i] >= 'a' && strRaw[i] <= 'z')
		{
			removeError(input);
			isValidKey = true;
			str[i] = strRaw[i];
		}
		else
		{
			showError(input);
			isValidKey = false;
			return;
		}
	}
	return str; 
};

var vigenere = function(plainText, key)
{
	var encrypt = document.getElementById("encrypt").checked;
	var dycrypt = document.getElementById("decrypt").checked;

	var plainTextSpaces = [];
	plainTextSpaces = getLocationOfSpaces(plainText);

	//convert these to be numbers
	var digitKey = convertCharArrayToDigits(key); // I'm calling "digitKey" a character array, because there are no digits in it, as they are denied
	var digitPlainText = convertCharArrayToDigits(plainText);

	// makes the key the same length as the plain-text
	var fullKey = resizeKey(digitKey, plainText, plainTextSpaces);
	var encryptedText = [];

	logInput(plainTextSpaces, plainText, digitPlainText, key, digitKey, fullKey);

	var temp = [];
	for (var i = 0; i < digitPlainText.length; i++)
	{
		if (digitPlainText[i] !== ' ')
		{
			temp[i] = (encrypt === true ? shiftChar(fullKey[i], digitPlainText[i]) : shiftCharBack(fullKey[i], digitPlainText[i]));
			encryptedText[i] = digitToLetter(temp[i]);
		}
		else
		{
			encryptedText[i] = ' ';
		}
	}
	return encryptedText;
};

var vigenereDecrypt = function(plainText, key)
{
	var plainTextSpaces = [];
	plainTextSpaces = getLocationOfSpaces(plainText);

	//convert these to be numbers
	var digitKey = convertCharArrayToDigits(key); // I'm calling "digitKey" a character array, because there are no digits in it, as they are denied
	var digitPlainText = convertCharArrayToDigits(plainText);

	// makes the key the same length as the plain-text
	var fullKey = resizeKey(digitKey, plainText, plainTextSpaces);
	var encryptedText = [];

	logInput(plainTextSpaces, plainText, digitPlainText, key, digitKey, fullKey);

	var temp = [];
	for (var i = 0; i < digitPlainText.length; i++)
	{
		if (digitPlainText[i] !== ' ')
		{
			temp[i] = shiftChar(fullKey[i], digitPlainText[i]);
			encryptedText[i] = digitToLetter(temp[i]);
		}
		else
		{
			encryptedText[i] = ' ';
		}
	}
	return encryptedText;
};

var getLocationOfSpaces = function(str)
{
	var locations = [];
	for (var i = 0; i < str.length; i++){
		if (str[i] === ' '){
			locations[locations.length] = i;
		}
	}
	return locations;
};

var convertCharArrayToDigits = function(str) 
{
	var digitString = [];
	for (var pos = 0; pos < str.length; pos++){
		digitString[pos] = letterToDigit(str[pos]);
	}
	return digitString;
};

var resizeKey = function (digitKey, plainText, plainTextSpaces)
{
	var actualKey = [], i = 0, j = 0, k = 0;
	while (i < plainText.length){
		if (plainTextSpaces[j] == i){
			actualKey[i] = ' ';
			j++;
			i++
		}
		else{
			actualKey[i] = digitKey[k % digitKey.length];
			i++;
			k++
		}
	}	
	return actualKey; 
};

var logInput = function(plainTextSpaces, plainText, digitPlainText, key, digitKey, fullKey)
{
	// verify our values in the console
	console.log("Location of spaces in plain-text: " + plainTextSpaces);
	console.log("plain-text: " + plainText);
	console.log("plain-text as digits: " + digitPlainText);
	console.log("key: " + key);
	console.log("key as digits: " + digitKey);
	console.log("actual key (expanded format):" + fullKey);
};

var shiftChar = function(originalNum, keyNum)
{
	var char = originalNum + keyNum; // add numbers together to get the location of the encrypted letter
	return char % MAX_CHAR; // return the mod...this prevents numbers that are higher than the MAX_CHAR. i.e: plain-text: W(22), key: T(19). 19+22=41. 41 doesnt align w/ a letter. 41%26 gives ups P(15).
};
var shiftCharBack = function(originalNum, keyNum)
{
	var char = keyNum - originalNum; 
	if (char < 0){
		char += MAX_CHAR;
	}
	return char; 
};


var digitToLetter = function(num)
{
	var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	for (var i = 0; i < MAX_CHAR; i++){
		if (num === i)
			return alphabet[i];
	}
};

var letterToDigit = function(char)
{
	char = char.toLowerCase();
	var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	for (var i = 0; i < MAX_CHAR; i++){
		if (char === ' '){
			return ' ';
		}
		if (char === alphabet[i]){
			return i;
		}
	}
};


// unused functions 
/*
var setAlaphaArray = function() 
{
	var startingPoint = 1, 
	alpha = []; 

	for (var i = 0; i < MAX_CHAR; i++) // put arrays in array
	{	
		alpha[i] = [];
	}
	for (var i = 0; i < MAX_CHAR; i++)
	{
		for (var j = 0; j < MAX_CHAR; j++)
		{
			(startingPoint + j <= MAX_CHAR ? alpha[i][j] = startingPoint + j: alpha[i][j] = startingPoint + j - MAX_CHAR);
		}
		startingPoint++;
	}
	
	return alpha;
};

var print2DArray = function (MAX_CHARSize, array) 
{
	for (var i = 0; i < MAX_CHARSize; i++)
	{
		for (var j = 0; j < MAX_CHARSize; j++)
		{
			console.log(array[i][j]);
		}
		console.log("next iteration...")
	}
};
*/