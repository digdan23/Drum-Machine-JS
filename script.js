const drumPad = document.querySelectorAll('.drum-pad')
const audioClip = document.querySelectorAll('.clip');
const display = document.getElementById("display");
let isPowerOn = false;

const drumLibrary = {
  Q: { name: "Heater 1", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  W: { name: "Heater 2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  E: { name: "Heater 3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  A: { name: "Heater 4", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4.mp3" },
  S: { name: "Clap",     url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  D: { name: "Open-HH",  url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  Z: { name: "Kick-n-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  X: { name: "Kick",     url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  C: { name: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }
};

const audio = new Audio();

const handleChange = () => {
  const inputCheck = document.getElementById("power-switch")
  const powerChanger = document.getElementById("power-description")
  inputCheck.addEventListener("change" , () => {
    if(inputCheck.checked){
      isPowerOn = true
      powerChanger.innerText = "Power: On";
    }
    else{
      isPowerOn = false;
      powerChanger.innerText = "Power: Off"
    }
  })
  
}

const playAudio = (id) => { 
  if(!isPowerOn) return;
  const song = Array.from(audioClip).find(song => song.id === id);
  audio.src = song.src;
  
  audio.play();
}

drumPad.forEach(pad => {
  const audioSelector = pad.querySelector(".clip");
  const id = audioSelector.getAttribute("id");
  const instrument = drumLibrary[id]; 
  pad.addEventListener("click" , () => {
    display.textContent = instrument.name; 
    playAudio(id);
  })
})

document.addEventListener("keydown" , (e) => {
  let key = e.key.toUpperCase()
  const instrument = drumLibrary[key];
  if(instrument){
      playAudio(key);
      display.textContent = instrument.name
    }
  })

handleChange()