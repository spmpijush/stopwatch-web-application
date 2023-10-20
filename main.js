let isRunning = false;
let startTime = 0;
let interval;
const lapTimes = [];

function startStop() {
    if (isRunning) {
        clearInterval(interval);
        document.getElementById("startStop").textContent = "Start";
        isRunning = false;
    } else {
        startTime = Date.now() - (lapTimes.length ? lapTimes.reduce((a, b) => a + b) : 0);
        interval = setInterval(updateTime, 10);
        document.getElementById("startStop").textContent = "Pause";
        isRunning = true;
    }
}

function reset() {
    clearInterval(interval);
    document.getElementById("display").textContent = "00:00:00.000";
    document.getElementById("startStop").textContent = "Start";
    lapTimes.length = 0;
    document.getElementById("lapTimes").innerHTML = "";
    isRunning = false;
}

function lap() {
    if (isRunning) {
        const currentTime = Date.now() - startTime;
        lapTimes.push(currentTime);
        const lapTimeText = formatTime(currentTime);
        const lapTimeItem = document.createElement("li");
        lapTimeItem.textContent = lapTimeText;
        document.getElementById("lapTimes").appendChild(lapTimeItem);
    }
}

function updateTime() {
    const currentTime = Date.now() - startTime;
    const formattedTime = formatTime(currentTime);
    document.getElementById("display").textContent = formattedTime;
}

function formatTime(time) {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = time % 1000;
    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
}

function pad(number, length = 2) {
    return number.toString().padStart(length, '0');
}
