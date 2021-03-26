//DOM Elements
const time = document.getElementById('time'),
	greeting = document.getElementById('greeting');
user = document.getElementById('name');
focus = document.getElementById('focus');


// Option 
const showAmPm = true;

// Show Time
function showTime() {
	// Output Time
	time.innerHTML = getTime();
	setTimeout(showTime, 1000);
}

//Add Zeros for displayTime
function addZero(n) {
	return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function getTime() {
	let today = new Date(),
		hour = today.getHours(),
		min = today.getMinutes(),
		sec = today.getSeconds();
	const amPm = hour >= 12 ? 'PM' : 'AM';
	// 12hr Format
	hour = hour % 12 || 12;
	return `${addZero(hour)}<spna>:</spna>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ''}`
}

const LABEL_TEXT = {
	GOOD_MORNING: 'Good Morning',
	GOOD_AFTERNOON: 'Good Afternoon',
	GOOD_NIGHT: 'Good Night',
}

const IMAGES_BG = {
	GOOD_MORNING: "url('./img/morning.jpg')",
	GOOD_AFTERNOON: "url('./img/day.jpg')",
	GOOD_NIGHT: "url('./img/night.jpg')",
}

// Set Backgrounds and Greeding
function setBgGreet() {
	let today = new Date(),
		hour = today.getHours();
	if (hour < 12) {
		//Morning
		document.body.style.backgroundImage = IMAGES_BG.GOOD_MORNING;
		greeting.textContent = LABEL_TEXT.GOOD_MORNING;
	} else if (hour < 18) {
		//Afternoon
		document.body.style.backgroundImage = IMAGES_BG.GOOD_AFTERNOON;
		greeting.textContent = LABEL_TEXT.GOOD_AFTERNOON;
	} else {
		// Evening
		document.body.style.backgroundImage = IMAGES_BG.GOOD_NIGHT;
		greeting.textContent = LABEL_TEXT.GOOD_NIGHT;
		document.body.style.color = 'white';
	}
}

const DEFAULT_TEXT = {
	name: '[Enter Your Name]',
	focus: '[Enter Focus]',
}

function getItemField(field) {
	if (!field) return; // 
	const fieldElement = document.getElementById(field)
	if (!fieldElement) return;
	if (localStorage.getItem(field) === null) {
		fieldElement.textContent = DEFAULT_TEXT[field];
	} else {
		fieldElement.textContent = localStorage.getItem(field);
	}
}

function setItemField(e) {
	if (e.type === 'keypress') {
		//Make sure enter is pressed
		if (e.which == 13 || e.keyCode == 13) {
			localStorage.setItem(e.target.id, e.target.innerText);
			e.target.blur();
			if (e.target.textContent === '') {
				e.target.textContent = DEFAULT_TEXT[e.target.id];
			}
		}
	} else {
		localStorage.setItem(e.target.id, e.target.innerText);
	}
}

user.addEventListener('change', setItemField);
user.addEventListener('blur', setItemField);
focus.addEventListener('change', setItemField);
focus.addEventListener('blur', setItemField);

//Run
showTime();
setBgGreet();
getItemField('focus');
getItemField('name');



