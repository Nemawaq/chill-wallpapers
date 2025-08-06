const toggleBtn = document.getElementById('darkModeToggle');
const audioPlayer = document.getElementById('background-music');
const playPauseBtn = document.getElementById('play-pause-btn');
const nextSongBtn = document.getElementById('next-song-btn');
const currentSongTitle = document.getElementById('current-song-title');
const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.getElementById('volume-icon');

// Splash Screen elements
const splashScreen = document.getElementById('splash-screen');
const enterButton = document.getElementById('enter-button');
const mainContent = document.getElementById('main-content');

// Define the playlist with custom titles
const playlist = [
  { file: 'file1.mp3', title: 'ჩუბინა' },
  { file: 'audiocleaner_20250805_160216_file.mp3', title: 'Darling' }
];
let currentSongIndex = 0;

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  toggleBtn.textContent = isDark ? '🌞 Light Mode' : '🌙 Dark Mode';
}

// Load theme from localStorage
window.onload = function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    toggleBtn.textContent = '🌞 Light Mode';
  }
};

toggleBtn.addEventListener('click', toggleDarkMode);

function updateSongTitle() {
  currentSongTitle.textContent = playlist[currentSongIndex].title;
}

function playMusic() {
  audioPlayer.play().catch(e => console.log("Playback prevented:", e));
  playPauseBtn.textContent = '⏸️';
}

function pauseMusic() {
  audioPlayer.pause();
  playPauseBtn.textContent = '▶️';
}

function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  audioPlayer.src = playlist[currentSongIndex].file;
  updateSongTitle();
  playMusic();
}

function updateVolumeIcon(volume) {
  if (volume == 0) {
    volumeIcon.textContent = '🔇';
  } else if (volume < 0.5) {
    volumeIcon.textContent = '🔈';
  } else {
    volumeIcon.textContent = '🔊';
  }
}

// Event listeners for music controls
playPauseBtn.addEventListener('click', () => {
  if (audioPlayer.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
});

nextSongBtn.addEventListener('click', playNextSong);

audioPlayer.addEventListener('ended', playNextSong);

volumeSlider.addEventListener('input', (event) => {
  audioPlayer.volume = event.target.value;
  updateVolumeIcon(audioPlayer.volume);
});

// Initial music setup on page load
function setupMusicPlayback() {
    audioPlayer.src = playlist[currentSongIndex].file;
    updateSongTitle();
    audioPlayer.volume = volumeSlider.value;
    updateVolumeIcon(audioPlayer.volume);
}
window.addEventListener('DOMContentLoaded', setupMusicPlayback);

// This is the new autoplay workaround
enterButton.addEventListener('click', () => {
  // Fade out the splash screen
  splashScreen.style.opacity = '0';

  // Wait for the fade-out transition to finish, then hide the splash screen
  setTimeout(() => {
    splashScreen.style.display = 'none';

    // Show the main content
    mainContent.style.display = 'block';
    setTimeout(() => {
      mainContent.style.opacity = '1';
    }, 10);

    // Allow scrolling
    document.body.style.overflow = 'auto';

    // Start the music
    playMusic();

  }, 1000); // 1000ms matches the CSS transition duration
});