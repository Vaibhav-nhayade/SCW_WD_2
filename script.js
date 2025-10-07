let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("lapsList");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0")
  );
}

function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  display.textContent = formatTime(elapsedTime);
}

startStopBtn.addEventListener("click", () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 1000);
    running = true;
    startStopBtn.textContent = "Pause";
    startStopBtn.classList.remove("start");
    startStopBtn.classList.add("lap");
  } else {
    clearInterval(timerInterval);
    running = false;
    startStopBtn.textContent = "Start";
    startStopBtn.classList.remove("lap");
    startStopBtn.classList.add("start");
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  running = false;
  elapsedTime = 0;
  lapCount = 0;
  display.textContent = "00:00:00";
  startStopBtn.textContent = "Start";
  startStopBtn.classList.remove("lap");
  startStopBtn.classList.add("start");
  lapsList.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (running) {
    lapCount++;
    const lapItem = document.createElement("li");
    lapItem.innerHTML = `<span>Lap ${lapCount}</span> ${display.textContent}`;
    lapsList.appendChild(lapItem);
  }
});
