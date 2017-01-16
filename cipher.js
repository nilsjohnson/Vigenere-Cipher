// This program is a basic Vigenere Cipher. It encrypts text, based on a key
// Title: Vigenere Cipher
// Programmer: Nils Johnson
// Last Modified: 1/13/2017, 10:51am

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const error_class = error_class;

function encrypt()
{
	var textEl = document.getElementById("plain-text");
	var keyEl = document.getElementById("key");
	var rawText = textEl.value.replace(/[^a-z\s]/gi, '');
	var rawKey = keyEl.value.replace(/[^a-z]/gi, '');
	var canEncrypt = true;
	if (rawText === '') {
		textEl.classList.add(error_class);
		canEncrypt = false;
	}
	else {
		textEl.classList.remove(error_class);
	}
	if (rawKey === '')
	{
		keyEl.classList.add(error_class);
		canEncrypt = false;
	}
	else {
		keyEl.classList.remove(error_class);
	}
	if (canEncrypt)
	{
		var encrypt = document.getElementById("encrypt").checked;
		var key = rawKey.toLowerCase();
		var text = rawText.toLowerCase();
		var output = '';
		var keyIndex = 0;
		for (var textIndex = 0; textIndex < text.length; textIndex++)
		{
			if (text[textIndex] === ' ')
			{
				output += ' ';
			}
			else
			{
				var newIndex;
				if (encrypt){
					newIndex = ALPHABET.indexOf(text[textIndex]) + ALPHABET.indexOf(key[keyIndex]);
				}
				else {
					newIndex = ALPHABET.indexOf(text[itextIndex]) - ALPHABET.indexOf(key[keyIndex]);
				}
				output += ALPHABET[newIndex % ALPHABET.length];
				keyIndex = (keyIndex + 1) % key.length;
			}
		}

		document.getElementById("encrypted-text").innerHTML = output;
	}
}