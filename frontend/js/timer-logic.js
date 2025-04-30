export let timeRemaining = 60;
export let interval = null;
export let isPaused = false;

export function startTimer(tickCallback, endCallback) {
    if (!interval) {
        interval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                tickCallback();
            } else {
                clearInterval(interval);
                interval = null;
                endCallback();
            }
        }, 1000);
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

export function resetTimer(seconds = 60) {
    timeRemaining = seconds;
}
