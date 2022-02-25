const startTimer = (duration) => {
	let ran = 0;
	let timer = duration;
	let breakLength = 60 * 5;
	let minutes, seconds;

	timerDiv.classList.toggle("timer-session");

	let timerInterval = setInterval(() => {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		document.querySelector(".display").textContent = minutes + ":" + seconds;

		if (!isPaused) {
			timer--;
		}

		if (timer < 0) {
			if (ran === 0) {
				timerDiv.classList.toggle("timer-break");
				timerDiv.classList.toggle("timer-session");

				ran++;
				timer = breakLength;
			} else {
				session++;

				clearInterval(timerInterval);
				timerDiv.classList.toggle("timer-break");

				document.querySelector(
					".display"
				).textContent = `Session ${session} and break ended.`;

				isStarted = false;
				isPaused = true;
			}
			audio.play();
		}
	}, 1000);

	return timerInterval;
};

let audio = new Audio(
	"https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
);

const timerDiv = document.querySelector(".timer");
let session = 0;
let isStarted = false;
let isPaused = true;
let sessionLength = 60 * 25;

document.querySelector("body").addEventListener("click", () => {
	if (isStarted === false) {
		startTimer(sessionLength);
		isStarted = true;
	} else {
		timerDiv.classList.toggle("timer-paused");
	}

	isPaused = !isPaused;
});
