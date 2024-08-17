// Mute/unmute soundtrack 
var sound = document.getElementById('soundtrack');
var soundtrackButton = document.getElementById('soundtrack-btn');

function controlMusic() {
    if (soundtrackButton.textContent === "Unmute") {
        sound.muted = false;
        soundtrackButton.textContent = "Mute";
        sound.play()
    }
    else {
        sound.muted = true;
        soundtrackButton.textContent = "Unmute";
    }
}

soundtrackButton.addEventListener('click',controlMusic);