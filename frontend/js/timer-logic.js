export let timeRemaining = 10; // тривалість гри
let interval = null;
export let isPaused = false;

export function startTimer(tickCallback, endCallback) {
    if (!interval) {
        interval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                tickCallback();
            } else {
                stopTimer();
                endCallback();
            }
        }, 1000);
    }
}

export function stopTimer(){
    if (interval !== null) {
        clearInterval(interval);
        interval = null;
    }
}

export function pauseTimer() {
    if (interval) {
        clearInterval(interval);
        interval = null;
        isPaused = true;
    }
}

export function continueTimer(tickCallback, endCallback) {
    if (!interval && isPaused) {
        isPaused = false;
        startTimer(tickCallback, endCallback);
    }
}

export function getTimeRemaining() {
    return timeRemaining;
}

export function resetTimer(seconds = 60) {
    timeRemaining = seconds;
}
