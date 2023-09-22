//song1 - Lawrence - TrackTribe
//song2 - Inconsciousness - Mini Vandals
//song3 - Boom Bap Flick - Quincas Moreira

const audio = document.querySelector('#audioPlayer');
const playPauseButton = document.getElementById('play-pause-button');
const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');
const songTitle = document.querySelector('#songTitle');
const songArtist = document.querySelector('#songArtist');
const songImg = document.querySelector('#songImg');

const backgroundBlur = document.querySelector('.backgroundBlur');

const audioFiles = [
    { title: 'Lawrence', artist: 'TrackTribe', img: 'images/song1.jpg', file: 'music/song1.mp3' },
    { title: 'Inconsciousness', artist: 'Mini Vandals', img: 'images/song2.jpg', file: 'music/song2.mp3' },
    { title: 'Boom Bap Flick', artist: 'Quincas Moreira', img: 'images/song3.jpg', file: 'music/song3.mp3' }
];

let currentTrackIndex = 0;

function loadTrack(index) {
    audio.src = audioFiles[index].file;
    audio.load();
    audio.play();
    songTitle.textContent = audioFiles[index].title;
    songArtist.textContent = audioFiles[index].artist;
    songImg.innerHTML = `
        <img src="${audioFiles[index].img}" />
    `
}

loadTrack(currentTrackIndex);

prevButton.addEventListener('click', () => {
    isPlaying = true;
    currentTrackIndex = (currentTrackIndex - 1 + audioFiles.length) % audioFiles.length;
    loadTrack(currentTrackIndex);
    checkIsPlaying();
    changeBackground(currentTrackIndex);
});

nextButton.addEventListener('click', () => {
    isPlaying = true;
    currentTrackIndex = (currentTrackIndex + 1) % audioFiles.length;
    loadTrack(currentTrackIndex);
    checkIsPlaying();
    changeBackground(currentTrackIndex);
});

audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % audioFiles.length;
    loadTrack(currentTrackIndex);
});

function changeBackground(songIndex) {
    const body = document.body;
    const song = audioFiles[songIndex];
    if (song) {
        backgroundBlur.style.backgroundImage = `url('${song.img}')`;
    }
}


//----------------------

let isPlaying = false;

function checkIsPlaying() {
    if (isPlaying) {
        audio.pause();
        playPauseButton.innerHTML = `
            <div class="playStopIcons">
                <ion-icon name="pause"></ion-icon>
            </div>
        `
        playPauseButton.innerHTML = `
            <div class="playStopIcons">
                <ion-icon name="play"></ion-icon>
            </div>
        `
    } else {
        audio.play();
        playPauseButton.innerHTML = `
            <div class="playStopIcons">
                <ion-icon name="pause"></ion-icon>
            </div>
        `
    }
    isPlaying = !isPlaying;
}
checkIsPlaying();

playPauseButton.addEventListener('click', () => {
    checkIsPlaying();
});

const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressWidth = (currentTime / duration) * 100 + '%';
    progress.style.width = progressWidth;
});

progressBar.addEventListener('click', (e) => {
    const progressBarRect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - progressBarRect.left;
    const progressBarWidth = progressBarRect.width;
    const seekTime = (clickX / progressBarWidth) * audio.duration;
    audio.currentTime = seekTime;
});

audio.addEventListener('ended', () => {
    playPauseButton.innerHTML = `
        <div class="playStopIcons">
            <ion-icon name="pause"></ion-icon>
        </div>
    `
    
    isPlaying = false;
});

