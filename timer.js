const timerDiv = document.querySelector(".timer");

const audio = new Audio("http://soundbible.com/grab.php?id=1531&type=mp3");
let startDate;
let endDate;
let pauseDate;

let sessionLength = 25;
let breakLength = 5;
let isStarted = false;
let isPaused = true;

let sessionCount = 0;

let interval;

let isBreak = false;

const getRemaining = (time) => {
	let total = time - new Date().getTime();
	const seconds = Math.floor((total / 1000) % 60);
	const minutes = Math.floor((total / 1000 / 60) % 60);
	const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

	return {
		total,
		hours,
		minutes,
		seconds,
	};
};

const startTimer = () => {
	interval = setInterval(() => {
		let remaining = getRemaining(endDate);

		if (!isBreak) {
			timerDiv.classList.toggle("timer-session");
		} else {
			timerDiv.classList.remove("timer-session");
			timerDiv.classList.toggle("timer-break");
		}

		if (remaining.total > 0 && !isPaused) {
			document.querySelector(".display").textContent =
				remaining.minutes + ":" + remaining.seconds;
		}

		if (remaining.total < 0) {
			if (isBreak === false) {
				endDate = new Date(endDate + breakLength * 60000).getTime();
				isBreak = true;
			} else {
				clearInterval(interval);
				isStarted = false;
				isBreak = false;

				document.querySelector(
					".display"
				).textContent = `Session ${++sessionCount} and break ended.`;
			}

			audio.play();
		}
	}, 1000);
};

document.querySelector("body").addEventListener("click", () => {
	if (!isStarted) {
		startDate = new Date().getTime();
		endDate = new Date(startDate + sessionLength * 60000).getTime();

		startTimer();

		isStarted = !isStarted;
	} else {
		timerDiv.classList.toggle("timer-paused");

		if (isPaused) {
			endDate = new Date(
				endDate + (pauseDate - new Date().getTime())
			).getTime();
		} else {
			pauseDate = new Date().getTime();
		}
	}

	isPaused = !isPaused;
});
