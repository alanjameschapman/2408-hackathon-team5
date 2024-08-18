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

soundtrackButton.addEventListener('click', controlMusic);

// User can choose theme music from dropdown
const audioDropdown = document.getElementById('audioDropdown');

// Load saved music choice from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedMusic = localStorage.getItem('selectedMusic');
    if (savedMusic) {
        sound.src = savedMusic;  // Set the source of the audio player
        sound.play();            // Play the selected audio
        audioDropdown.value = savedMusic; // Set the dropdown to the saved option
    }
});

// Event listener for dropdown change
audioDropdown.addEventListener('change', function () {
    const selectedMusic = this.value;

    if (selectedMusic) {
        sound.src = selectedMusic;  // Update the source of the audio player
        sound.play();               // Play the selected audio

        // Save the selected music in localStorage
        localStorage.setItem('selectedMusic', selectedMusic);
    }
});