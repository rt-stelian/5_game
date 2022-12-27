const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeBtns = document.querySelector('#time-list');
let time = 0;
const timeElement = document.querySelector('#time');
const board = document.querySelector('#board');

let score = 0;
const colors = ['#FFF633', '#FF8133', '#D3FF33', '#3DFF33', '#33FFFE', '#3368FF', '#F61BFF', '#FF1B86'];

startBtn.addEventListener('click', (event) => {
	event.preventDefault();
	screens[0].classList.add('up');
});
stratBtnEv();
function stratBtnEv() {
	timeBtns.addEventListener('click', (event) => {
		if (event.target.classList.contains('time-btn')) {
			time = parseInt(event.target.getAttribute('data-time'));
			screens[1].classList.add('up');
			startGame();
		}
	});
}

board.addEventListener('click', (event) => {
	if (event.target.classList.contains('circle')) {
		score++;
		event.target.remove();
		randomCircle();
	}
});

let timer;

function startGame() {
	timer = setInterval(decreaseTime, 1000);
	setTime(time);
	randomCircle();
}

function decreaseTime() {
	if (time <= 0) {
		clearInterval(timer);
		finishGame();
	} else {
		let current = --time;
		if (current < 10) {
			current = `0${current}`;
		}
		setTime(current);
	}
}

function setTime(value) {
	timeElement.innerHTML = `00:${value}`;
}

function finishGame() {
	let scoreText = `<h1 class="old-game">Your Score : <span  class="primary">${score}</span></h1>`;

	timeElement.parentNode.classList.add('hide');
	board.innerHTML = scoreText;
	startNewGame();
}

function startNewGame() {
	let newGameText = `<h1 class="new-game"> <span > Start New Game</span></h1>`;
	setTimeout(() => {
		board.innerHTML = newGameText;
		const newGame = document.querySelector('.new-game');
		newGame.addEventListener('click', () => {
			screens[1].className = 'screen';
			board.innerHTML = '';
			score = 0;
			timeElement.parentNode.classList.remove('hide');
		});
	}, 2200);
}

function randomCircle() {
	const circle = document.createElement('div');
	const size = getRandomNumb(10, 45);
	const {width, height} = board.getBoundingClientRect();
	const posX = getRandomNumb(0, width - size);
	const posY = getRandomNumb(0, height - size);

	circle.classList.add('circle');
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${posX}px`;
	circle.style.left = `${posY}px`;
	setBg(circle);

	board.append(circle);
}

function getRandomNumb(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
	const index = Math.floor(Math.random() * colors.length);
	return colors[index];
}

function setBg(elem) {
	elem.style.backgroundColor = getRandomColor();
}
