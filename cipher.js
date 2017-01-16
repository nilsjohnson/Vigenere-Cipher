// This program is a basic Vigenere Cipher. It encrypts text, based on a key
// Title: Vigenere Cipher
// Programmer: Nils Johnson
// Last Modified: 1/16/2017, 3:35pm

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

var main = function()
{
	var isValidInput = true;
	
	var textEl = document.getElementById("plain-text");
	var	keyEl = document.getElementById("key");

	var text = getStringOfCharAndSpaces(textEl);
	var key = getStringOfChar(keyEl);

	if (isValidInput)
	{
		var encrypt = document.getElementById("encrypt").checked;

		var newIndex;
		var output = '';
 		var i = 0, j = 0; // i = text index, j = key index
 		if (encrypt)
 		{
 			while (i < text.length)
 			{
 				if (text[i] === ' ')
 				{
 					output += ' ';
 					i++;
 				}
 				else 
 				{
 					newIndex = ALPHABET.indexOf(text[i]) + ALPHABET.indexOf(key[j % key.length]);
 					output += ALPHABET[newIndex % ALPHABET.length];
 					i++;
 					j++;
 				}
 			}
 		}
 		else
 		{
 			while (i < text.length)
 			{
 				if (text[i] === ' ')
 				{
 					output += ' ';
 					i++;
 				}
 				else 
 				{
 					newIndex = ALPHABET.indexOf(text[i]) - ALPHABET.indexOf(key[j % key.length]);
 					if (newIndex < 0){
 						newIndex += ALPHABET.length;
 					}
 					output += ALPHABET[newIndex];
 					i++;
 					j++;
 				}
 			}
 		}	
 		document.getElementById("encrypted-text").innerHTML = output;
 	}
 };

 var getStringOfCharAndSpaces = function(input)
 {
 	var strRaw = input.value;
 	var str = [];
 	for (var i = 0; i < strRaw.length; i++)
 	{
 		if (strRaw[i] >= 'A' && strRaw[i] <= 'Z' || strRaw[i] >= 'a' && strRaw[i] <= 'z' || strRaw[i] === ' ')
 		{
 			input.classList.remove("error");
 			isValidPlainText = true;
 			str[i] = strRaw[i];
 		}
 		else
 		{
 			input.classList.add("error");
 			isValidPlainText = false;
 			return;
 		}
 	}
 	return str; 
 };

 var getStringOfChar = function(input)
 {
 	var strRaw = input.value;
 	var str = [];
 	for (var i = 0; i < strRaw.length; i++)
 	{
 		if (strRaw[i] >= 'A' && strRaw[i] <= 'Z' || strRaw[i] >= 'a' && strRaw[i] <= 'z')
 		{
 			input.classList.remove("error");
 			isValidKey = true;
 			str[i] = strRaw[i];
 		}
 		else
 		{
 			input.classList.add("error");
 			isValidKey = false;
 			return;
 		}
 	}
 	return str; 
 };
