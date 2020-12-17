const ARR_NUMBER = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const ARR_EN = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const ARR_EN_UPPER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const ARR_SYMBOL = ['!', '@', '#', '$', '%', '?', '-', '+', '=', '~'];

const compareRandom = () => Math.random() - 0.5;
const randomInteger = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

let generatedPassword = "";
let hackedPassword = "";
let hackingStarted = false;

function generatePassword() {
	let baseArray = [];
	if (document.querySelector('#arr_num').checked) baseArray = [...baseArray, ...ARR_NUMBER ];
	if (document.querySelector('#arr_en').checked) baseArray = [...baseArray, ...ARR_EN];
	if (document.querySelector('#arr_EN').checked) baseArray = [...baseArray, ...ARR_EN_UPPER];
	if (document.querySelector('#arr_symb').checked) baseArray = [...baseArray, ...ARR_SYMBOL];
	baseArray.sort(compareRandom);

	let genPassword = "";
	const passLenght = document.querySelector('#genPassLenght').value;
		
	for (let i = 0; i < passLenght; i++) {
		genPassword += baseArray[randomInteger(0, baseArray.length - 1)];
	}

	generatedPassword = genPassword
	document.querySelector('#gen_result').textContent = genPassword;
	document.querySelector('#hack_result').textContent = "PASSWORD";
}




async function hackPassword() {
	if (!generatedPassword) {
		return alert("Помилка! Спочатку згенеруйте пароль!")
	}

	let baseArray = [];
	if (document.querySelector('#arr_num').checked) baseArray = [...baseArray, ...ARR_NUMBER];
	if (document.querySelector('#arr_en').checked) baseArray = [...baseArray, ...ARR_EN];
	if (document.querySelector('#arr_EN').checked) baseArray = [...baseArray, ...ARR_EN_UPPER];
	if (document.querySelector('#arr_symb').checked) baseArray = [...baseArray, ...ARR_SYMBOL];
	const hackPassLenght = document.querySelector('#hackPassLenght').value;

	if (baseArray.length === 0) {
		return alert("Помилка! Виберіть набір символів для підбору!")
	}

	if (hackingStarted) {
		if (confirm("Ви впевнені що хочете зупинити підбір?")) {
			hackingStarted = false;
			return document.querySelector('#hack_start_btn').textContent = "Почати підбір";
		}
	} else {
		hackingStarted = true
		document.querySelector('#hack_start_btn').textContent = "Зупинити підбір";
	}



	let hackPassword = [];
	for(let i=0; i< hackPassLenght; i++){
		hackPassword[i] = 0;
	}
	const iterationCount = Math.pow(baseArray.length, hackPassLenght);


	for (let a = 0; a < baseArray.length; a++) {
		if (!hackingStarted) { return }
		hackPassword[0] = baseArray[a];
		if (hackPassLenght == 1) {
			hackPassword.length = hackPassLenght;
			let candidate = hackPassword.join("");
			console.log(candidate);
			comparePassword(candidate);
		}

		for (let b = 0; b < baseArray.length; b++) {
			if (!hackingStarted) { return }
			hackPassword[1] = baseArray[b];
			if (hackPassLenght == 2) {
				hackPassword.length = hackPassLenght;
				let candidate = hackPassword.join("");
				console.log(candidate);
				comparePassword(candidate);
			}

			for (let c = 0; c < baseArray.length; c++) {
				if (!hackingStarted) { return }
				hackPassword[2] = baseArray[c];
				if (hackPassLenght == 3) {
					hackPassword.length = hackPassLenght;
					let candidate = hackPassword.join("");
					console.log(candidate);
					comparePassword(candidate);
				}

				for (let d = 0; d < baseArray.length; d++) {
					if (!hackingStarted){return}
					hackPassword[3] = baseArray[d];
					if (hackPassLenght == 4) {
						hackPassword.length = hackPassLenght;
						let candidate = hackPassword.join("");
						console.log(candidate);
						comparePassword(candidate);
					}

				}
			}
		}
	}
}

function comparePassword (candidate) {
	if (candidate === generatedPassword) {
		hackedPassword = candidate;
		document.querySelector('#hack_result').textContent = candidate;
		document.querySelector('#hack_start_btn').textContent = "Почати підбір";
		hackingStarted = false;
		return alert(`Вітаємо! Пароль знайдено: ${hackedPassword}`);
	}
}

async function hackMyPassword () {
	if (hackingStarted) {
		return alert ("Щоб спробувати, спочатку зупиніть автоматичний підбір!");
	}

	if (!generatedPassword) {
		return alert("Помилка! Спочатку згенеруйте пароль!")
	}

	const myPass = document.querySelector('#hack_my_pass').value;

	if (!myPass) {
		return alert("Помилка! Введіть ймовірний пароль!");
	}

	if (myPass == generatedPassword) {
		hackedPassword = myPass
		document.querySelector('#hack_result').textContent = myPass;
		return alert(`Вітаємо! Ви відгадали пароль: ${myPass}`);
	} else {
	 return	alert ("На жаль, пароль невірний");
	}
}


document.querySelector('#gen_start_btn').addEventListener('click', generatePassword);
document.querySelector('#hack_start_btn').addEventListener('click', hackPassword);
document.querySelector('#hack_my_pass_btn').addEventListener('click', hackMyPassword);