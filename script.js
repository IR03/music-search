// Get the input field
var input = document.getElementById("search-bar");
document.getElementById('song-container').innerHTML = "";
document.getElementById('lyrics-container').innerHTML = "";

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
     // Cancel the default action, if needed
       //event.preventDefault();
     // Trigger the button element with a click
     document.getElementById("search-btn").click();
   }
});
const searchSong = async () => {
    const searchTxt = document.getElementById('search-bar').value;
    document.getElementById('song-container').innerHTML = "";
    document.getElementById('lyrics-container').innerHTML = "";
    //console.log(searchTxt);
    const url = `https://api.lyrics.ovh/suggest/${searchTxt}`
    toggleSpinner();
    //console.log(url);
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    }
    catch (error) {
        displayError('Sorry something went wrong');
    }

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displaySongs(data.data))
}

const displaySongs = songs => {
    //console.log(songs);
    const songContainer = document.getElementById('song-container');
    songs.forEach(song => {
        console.log(song);
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div  class="col-md-9">
           <h3 class="lyrics-name">${song.title}</h3>
           <p class="author lead">Album by <span>${song.artist.name}</span></p>
           <audio controls autoplay muted>
                <source src="${song.preview}" type="audio/mpeg">
           </audio>
       </div>
       <div class="col-md-3 text-md-right text-center">
           <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
       </div>
        `;
        
        songContainer.appendChild(songDiv);
        toggleSpinner();
        
    })
}
const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    //console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    const lyrics = data.lyrics;
    displayLyrics(lyrics);

    // fetch(url)
    // .then(res => res.json())
    // .then(data =>{
    //     const lyrics = data.lyrics;
    //     //console.log(lyrics);
    //     displayLyrics(lyrics);
    //   })

}
const displayLyrics = lyric => {
    const lyricsDiv = document.getElementById('lyrics-container');
    lyricsDiv.innerText = lyric;
}
const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}
const toggleSpinner = () =>{
    const spinner = document.getElementById('loading-spinner');
    spinner.classList.toggle('d-none');
    // if(show){
    //     spinner.classList.remove('d-none');
    // }
    // else{
    //     spinner.classList.add('d-none');
    // }
}
