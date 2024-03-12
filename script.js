console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let MasterSongName = document.getElementById('SongName');
 
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "295", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Levels", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "The Last Ride", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
{songName: "So High", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
{songName: "Dear Mama", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
{songName: "Legend", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
{songName: "Never Fold", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
{songName: "Goat", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
{songName: "Sidhu Son", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},

]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//audioElement.play();
//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity=0;
    }
})
//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex= parseInt(e.target.id);
        audioElement.src = songs[songIndex-1].filePath;
        SongName.innerText = songs[songIndex-1].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        // Pause functionality when individual pause button is clicked
        element.addEventListener('click', () => {
            if (!audioElement.paused) {
                audioElement.pause(); // Pause the song if it's playing
                gif.style.opacity = 0; // Hide the playing GIF
                e.target.classList.remove('fa-pause'); // Toggle individual play button icon
                e.target.classList.add('fa-play');
            } else {
                audioElement.currentTime = audioElement.dataset.currentTime || 0; // Resume from the saved playback position
                audioElement.play(); // Resume playing the song if it's paused
                gif.style.opacity = 1; // Show the playing GIF
                e.target.classList.remove('fa-play'); // Toggle individual play button icon
                e.target.classList.add('fa-pause');
            }
    });
     // Update the dataset with the current playback position
     audioElement.addEventListener('timeupdate', () => {
        element.dataset.currentTime = audioElement.currentTime;
     });
});
});

document.getElementById('next').addEventListener('click', () =>{
    if(songIndex>8)
    {
        songIndex=1;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    SongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    myProgressBar.value = 0;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=1)
    {
        songIndex=1;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    SongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})