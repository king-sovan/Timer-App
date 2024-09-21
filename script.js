let timers = [];

document.getElementById("setTimerBtn").addEventListener("click", function() {
    let hours = parseInt(document.getElementById("hours").value) || 0;
    let minutes = parseInt(document.getElementById("minutes").value) || 0;
    let seconds = parseInt(document.getElementById("seconds").value) || 0;

    let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    
    if (totalSeconds > 0) {
        addNewTimer(totalSeconds);
    }
});

function addNewTimer(duration) {
    let timerID = Date.now();
    let timeLeft = duration;

    const interval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(interval);
            timerEnded(timerID);
            playSound();
        } else {
            timeLeft--;
            updateTimerDisplay(timerID, timeLeft);
        }
    }, 1000);

    timers.push({ id: timerID, interval: interval, timeLeft: duration });
    displayTimer(timerID, timeLeft);
}

function displayTimer(timerID, timeLeft) {
    const activeTimers = document.getElementById('activeTimers');
    const timerElement = document.createElement('div');
    timerElement.className = 'timer';
    timerElement.id = `timer-${timerID}`;

    let hours = Math.floor(timeLeft / 3600);
    let minutes = Math.floor((timeLeft % 3600) / 60);
    let seconds = timeLeft % 60;

    timerElement.innerHTML = `
        <span id="time-left-${timerID}">${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}</span>
        <button class="delete-btn" onclick="deleteTimer(${timerID})">Delete</button>
    `;

    if (activeTimers.innerHTML.includes('You have no timers currently!')) {
        activeTimers.innerHTML = ''; 
    }

    activeTimers.appendChild(timerElement);
}

function updateTimerDisplay(timerID, timeLeft) {
    const timerElement = document.getElementById(`time-left-${timerID}`);
    if (timerElement) {
        let hours = Math.floor(timeLeft / 3600);
        let minutes = Math.floor((timeLeft % 3600) / 60);
        let seconds = timeLeft % 60;

        timerElement.textContent = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
    }
}

function timerEnded(timerID) {
    const timerElement = document.getElementById(`timer-${timerID}`);
    if (timerElement) {
        timerElement.classList.add("ended");
        timerElement.children[0].textContent = "Timer Is Up!";
    }
}

function deleteTimer(timerID) {
    const timer = timers.find(t => t.id === timerID);
    if (timer) {
        clearInterval(timer.interval); 
        timers = timers.filter(t => t.id !== timerID); 
        document.getElementById(`timer-${timerID}`).remove(); 
    }

    if (timers.length === 0) {
        document.getElementById('activeTimers').innerHTML = '<p>You have no timers currently!</p>';
    }
}

function playSound() {
    let sound = new Audio('path/to/your/sound.mp3');
    sound.play();
}
