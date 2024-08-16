// Mute/unmute soundtrack 
var sound = document.getElementById('soundtrack');
var soundtrackButton = document.getElementById('soundtrack-btn');

function controlMusic() {
    if (sound.muted) {
        sound.muted = false;
        soundtrackButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        sound.play()
    }
    else {
        sound.muted = true;
        soundtrackButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
}

soundtrackButton.addEventListener('click',controlMusic);
