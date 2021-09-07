const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const beforeBtn = document.querySelector('#before');
const afterBtn = document.querySelector('#after');

const audio = document.querySelector('#audio');
const musicProgress= document.querySelector('#music-progress');
const progressContainer = document.querySelector('#progress-cont');
const titel=document.querySelector('#music-title')
const musicPic= document.querySelector('#music-bild') //cover



// song titel
const musics=['June - Bobby Richards','Two Moons - Bobby Richards']
// console.log(musics[1])

//Hålla koll på låtar
let musicIndex=1

//initially load song info DOM
loadSong(musics[musicIndex])


//updatedare songs information
function loadSong(song){
    titel.innerText = song
    audio.src=`audio/${song}.mp3`; 
    musicPic.src = `bild/${song}.jpg`;

}

function playSong() {
 musicContainer.classList.add('play')
 //change the icon
 playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  //the music to sound
  audio.play()

}
function pauseSong() {
 musicContainer.classList.remove('play')
 //change the icon
 playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');     

//the music to stop sounding
  audio.pause()
}

function beforeSong(){
musicIndex --
//loop to the begining
if(musicIndex < 0){
    musicIndex = musics.length - 1
}
loadSong(musics[musicIndex])
playSong()
}

function afterSong(){
musicIndex ++
//loop to the begining
if(musicIndex > musics.length-1){
    musicIndex = 0
}
loadSong(musics[musicIndex])
playSong()
}

function updateProgress(e){
    const{duration,currentTime} = e.srcElement
    const progressProcent= (currentTime / duration) * 100;
    musicProgress.style.width = `${progressProcent}%`;
}

function setProgress(e){
    const showWidth= this.clientWidth;
    //show where i am clicking in the progress bar
    const clickWidth= e.offsetX;
    const musicDuration= audio.duration

    audio.currentTime=(clickWidth/showWidth)*musicDuration

}

//Event Listners
playBtn.addEventListener('click',()=>{
    //see if the music is playing
    const musicPlaying= musicContainer.classList.contains('play')
    if(musicPlaying){
        pauseSong()
    } else{
        playSong()
    }
})

//change song events
beforeBtn.addEventListener('click',beforeSong)
afterBtn.addEventListener('click',afterSong)

//when the song is playing it will be constatly called
audio.addEventListener('timeupdate', updateProgress)


//Click on the progress bar and have it go anywhere on the song
progressContainer.addEventListener('click',setProgress)

//if music end, go automatically to the next music
audio.addEventListener('ended',afterSong)