let countdown;
let timerDuration;
let timerElement = document.getElementById('timer');
let messageElement = document.getElementById('display-message');
let smallMessageElement = document.getElementById('small-message');
let controlPanel = document.getElementById('control-panel');
let fullscreenContainer = document.getElementById('fullscreen-container');
let audio = document.getElementById("bgmusic");

document.getElementById('start-button').addEventListener('click', startCountdown);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Control') {
        toggleControlPanel();
    }
    if(event.key=== "P" || event.key === "p"){
        togglePlay();
    }

});

function startCountdown() {
    // timerDuration = parseInt(document.getElementById('duration').value * 60);
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    timerDuration = (minutes * 60) + seconds; 

    let message = document.getElementById('message').value;
    messageElement.innerText = message;

    if (isNaN(timerDuration) || timerDuration <= 0) {
        alert("Please enter a valid duration.");
        return;
    }

    controlPanel.classList.add('hidden');
    fullscreenContainer.classList.remove('hidden');
    // timerElement.innerText = timerDuration;
    updateTimerDisplay(timerDuration);


    countdown = setInterval(() => {
        timerDuration--;
        // timerElement.innerText = timerDuration;
        updateTimerDisplay(timerDuration);

        if (timerDuration <= 0) {
            clearInterval(countdown);
            messageElement.innerText = "Session will start shortly";
            // smallMessageElement.innerText = "The session will begin shortly!";
            // timerElement.classList.add('hidden');
            // messageElement.classList.add('hidden');
            // smallMessageElement.classList.remove('hidden');
            
            // fullscreenContainer.classList.add('hidden');
            // controlPanel.classList.remove('hidden');
        }
    }, 1000);
}


function updateTimerDisplay(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    timerElement.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function toggleControlPanel() {
    if (controlPanel.classList.contains('hidden')) {
        controlPanel.classList.remove('hidden');
        fullscreenContainer.classList.add('hidden');
        clearInterval(countdown);
    } else {
        controlPanel.classList.add('hidden');
        fullscreenContainer.classList.remove('hidden');
        startCountdown(); 
    }
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}


