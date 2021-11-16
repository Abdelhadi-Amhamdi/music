const audio_player = document.querySelector(".audio");
const show_btn = document.querySelector(".show-btn");
const close_btn = document.querySelector(".close-btn");
const menu_body = document.querySelector(".menu-body");
const play_btn = document.querySelector(".play-btn");
const title = document.querySelector('.song-title')
const artist = document.querySelector('.artist')


const songs = [
  {
    id: 0,
    name: "song-one",
    src: "./sounds/a_6.mp3",
    artist: "bensound-music",
    title:'memories'
  },
  {
    id: 1,
    name: "song-tow",
    src: "./sounds/a_6.mp3",
    artist:'bensound-music',
    title:'romantic'
  },
  {
    id: 2,
    name: "song-three",
    src: "./sounds/a_6.mp3",
    artist:'bensound-music',
    title:"love"
  },
];

let current_song = 0;

show_btn.addEventListener("click", () => {
  menu_body.classList.remove("hide");
  menu_body.classList.add("show");
  show_btn.classList.add("hide");
  close_btn.classList.remove("hide-btn");
});

close_btn.addEventListener("click", () => {
  menu_body.classList.remove("show");
  menu_body.classList.add("hide");
  close_btn.classList.add("hide-btn");
});

// play_btn.addEventListener('click' , () => {
//   audio_player.setAttribute('src' , songs[current_song].src)
//   audio_player.play()
// })

const texts = document.querySelector(".texts");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "EN";

let p = document.createElement("p");

recognition.addEventListener("result", (e) => {
  console.log(
    Array.from(e.results)
      .map((res) => res[0])
      .map((res) => res.transcript)
  );
  const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  p.innerText = text;
  if (e.results[0].isFinal) {
    console.log(e);
    if (text.includes("play music")) {
      audio_player.setAttribute("src", "./sounds/playmusic.mp3");
      audio_player.play();
      setTimeout(() => {
        title.innerText = songs[current_song].title
        artist.innerText = songs[current_song].artist
        audio_player.setAttribute("src", songs[current_song].src);
        audio_player.play();
      }, 2000);
    }
    if (text.includes("pause music") || text.includes("stop music")) {
      audio_player.setAttribute("src", "./sounds/stopmusic.mp3");
      audio_player.play();
      setTimeout(() => {
        audio_player.pause();
      }, 2000);
    }
    if (text.includes("next")) {
      current_song++;
      audio_player.setAttribute("src", "./sounds/next.mp3");
      audio_player.play();
      setTimeout(() => {
        title.innerText = songs[current_song].title
        artist.innerText = songs[current_song].artist
        audio_player.setAttribute("src", songs[current_song].src);
        audio_player.play();
      }, 2000);
    }
    if (text.includes("previous")) {
      current_song--;
      audio_player.setAttribute("src", "./sounds/prev.mp3");
      audio_player.play();
      setTimeout(() => {
        title.innerText = songs[current_song].title
        artist.innerText = songs[current_song].artist
        audio_player.setAttribute("src", songs[current_song].src);
        audio_player.play();
      }, 2000);
    }
  }
});

recognition.addEventListener("end", () => {
  recognition.start();
});

recognition.start();
