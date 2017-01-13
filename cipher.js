// This program is a basic Vigenere Cipher. It encrypts text, based on a key
// Title: Vigenere Cipher
// Programmer: Nils Johnson
// Last Modified: 1/13/2017, 10:51am

var isValidPlainText;
var isValidKey;
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

function encrypt()
{
	var textEl = document.getElementById("plain-text");
	var keyEl = document.getElementById("key");
	var rawText = textEl.value;
	var rawKey = keyEl.value;
	var canEncrypt = true;
	if (rawText === '')
	{
		textEl.classList.add('error');
		canEncrypt = false;
	}
	if (key === '')
	{
		keyEl.classList.add('error');
		canEncrypt = false;
	}
	var encrypt = document.getElementById("encrypt").checked;
	if (canEncrypt)
	{
		var key = rawKey.toLowerCase();
		var text = rawText.toLowerCase();
		var output = ''
		var keyIndex = 0;
		for (var i = 0; i < text.length; i++)
		{
			if (text[i] === ' ')
			{
				output += ' ';
			}
			else
			{
				var newIndex;
				if (encrypt){
					newIndex = ALPHABET.indexOf(text[i]) + ALPHABET.indexOf(key[keyIndex]);
				}
				else {
					newIndex = ALPHABET.indexOf(text[i]) - ALPHABET.indexOf(key[keyIndex]);
				}
				output += ALPHABET[newIndex % ALPHABET.length];
				keyIndex = (keyIndex + 1) % key.length;
			}
			console.log(output);
		}

		document.getElementById("encrypted-text").innerHTML = output;
	}
	return;
};